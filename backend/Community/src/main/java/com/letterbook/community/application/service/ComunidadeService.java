package com.letterbook.community.application.service;

import com.letterbook.community.api.dto.ComunidadeRequest;
import com.letterbook.community.api.dto.ComunidadeResponse;
import com.letterbook.community.api.dto.MembroComunidadeResponse;
import com.letterbook.community.domain.model.ComunidadeEntity;
import com.letterbook.community.domain.model.MembroComunidadeEntity;
import com.letterbook.community.domain.repository.ComunidadeRepository;
import com.letterbook.community.domain.repository.MembroComunidadeRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ComunidadeService {

    private final ComunidadeRepository comunidadeRepository;
    private final MembroComunidadeRepository membroRepository;

    public ComunidadeService(ComunidadeRepository comunidadeRepository,
                           MembroComunidadeRepository membroRepository) {
        this.comunidadeRepository = comunidadeRepository;
        this.membroRepository = membroRepository;
    }

    @Transactional
    public ComunidadeResponse criarComunidade(UUID criadorId, ComunidadeRequest request) {
        // Verificar se já existe uma comunidade com este nome
        if (comunidadeRepository.findByNome(request.nome()).isPresent()) {
            throw new IllegalArgumentException("Já existe uma comunidade com este nome.");
        }

        ComunidadeEntity comunidade = new ComunidadeEntity();
        comunidade.setNome(request.nome());
        comunidade.setDescricao(request.descricao());
        comunidade.setImagemUrl(request.imagemUrl());
        comunidade.setCriadorId(criadorId);

        ComunidadeEntity salva = comunidadeRepository.save(comunidade);

        // Adicionar o criador como admin da comunidade
        MembroComunidadeEntity membro = new MembroComunidadeEntity();
        membro.setUsuarioId(criadorId);
        membro.setComunidadeId(salva.getId());
        membro.setTipo(MembroComunidadeEntity.TipoMembro.ADMIN);
        membroRepository.save(membro);

        return toResponse(salva, criadorId);
    }

    public Page<ComunidadeResponse> listarComunidades(String nome, Pageable pageable, UUID usuarioLogadoId) {
        Page<ComunidadeEntity> comunidades;
        
        if (nome != null && !nome.trim().isEmpty()) {
            comunidades = comunidadeRepository.findByNomeContaining(nome, pageable);
        } else {
            comunidades = comunidadeRepository.findAll(pageable);
        }

        return comunidades.map(comunidade -> toResponse(comunidade, usuarioLogadoId));
    }

    public ComunidadeResponse buscarComunidade(UUID comunidadeId, UUID usuarioLogadoId) {
        ComunidadeEntity comunidade = comunidadeRepository.findById(comunidadeId)
            .orElseThrow(() -> new IllegalArgumentException("Comunidade não encontrada."));
        
        return toResponse(comunidade, usuarioLogadoId);
    }

    public List<ComunidadeResponse> listarMinhasComunidades(UUID usuarioId) {
        List<ComunidadeEntity> comunidades = comunidadeRepository.findByUsuarioId(usuarioId);
        return comunidades.stream()
            .map(comunidade -> toResponse(comunidade, usuarioId))
            .collect(Collectors.toList());
    }

    @Transactional
    public void entrarComunidade(UUID usuarioId, UUID comunidadeId) {
        ComunidadeEntity comunidade = comunidadeRepository.findById(comunidadeId)
            .orElseThrow(() -> new IllegalArgumentException("Comunidade não encontrada."));

        if (membroRepository.existsByUsuarioIdAndComunidadeId(usuarioId, comunidadeId)) {
            throw new IllegalArgumentException("Você já é membro desta comunidade.");
        }

        MembroComunidadeEntity membro = new MembroComunidadeEntity();
        membro.setUsuarioId(usuarioId);
        membro.setComunidadeId(comunidadeId);
        membro.setTipo(MembroComunidadeEntity.TipoMembro.MEMBRO);
        membroRepository.save(membro);
    }

    @Transactional
    public void sairComunidade(UUID usuarioId, UUID comunidadeId) {
        MembroComunidadeEntity membro = membroRepository.findByUsuarioIdAndComunidadeId(usuarioId, comunidadeId)
            .orElseThrow(() -> new IllegalArgumentException("Você não é membro desta comunidade."));

        if (membro.getTipo() == MembroComunidadeEntity.TipoMembro.ADMIN) {
            throw new IllegalArgumentException("Administradores não podem sair da comunidade.");
        }

        membroRepository.delete(membro);
    }

    public List<MembroComunidadeResponse> listarMembros(UUID comunidadeId) {
        List<MembroComunidadeEntity> membros = membroRepository.findByComunidadeId(comunidadeId);
        return membros.stream()
            .map(this::toMembroResponse)
            .collect(Collectors.toList());
    }

    public List<MembroComunidadeResponse> listarRankingComunidade(UUID comunidadeId) {
        List<MembroComunidadeEntity> membros = membroRepository.findTopByComunidadeIdOrderByPontosDesc(comunidadeId);
        return membros.stream()
            .map(this::toMembroResponse)
            .collect(Collectors.toList());
    }

    @Transactional
    public void adicionarPontos(UUID usuarioId, UUID comunidadeId, Integer pontos) {
        Optional<MembroComunidadeEntity> membroOpt = membroRepository.findByUsuarioIdAndComunidadeId(usuarioId, comunidadeId);
        
        if (membroOpt.isPresent()) {
            MembroComunidadeEntity membro = membroOpt.get();
            membro.setPontos(membro.getPontos() + pontos);
            membroRepository.save(membro);
        }
    }

    private ComunidadeResponse toResponse(ComunidadeEntity entity, UUID usuarioLogadoId) {
        Long totalMembros = membroRepository.countByComunidadeId(entity.getId());
        
        MembroComunidadeEntity.TipoMembro meuTipo = null;
        Integer meusPontos = 0;
        
        if (usuarioLogadoId != null) {
            Optional<MembroComunidadeEntity> meuMembro = membroRepository.findByUsuarioIdAndComunidadeId(usuarioLogadoId, entity.getId());
            if (meuMembro.isPresent()) {
                meuTipo = meuMembro.get().getTipo();
                meusPontos = meuMembro.get().getPontos();
            }
        }

        return new ComunidadeResponse(
            entity.getId(),
            entity.getNome(),
            entity.getDescricao(),
            entity.getImagemUrl(),
            entity.getCriadorId(),
            entity.getCreatedAt(),
            entity.getUpdatedAt(),
            totalMembros.intValue(),
            meuTipo,
            meusPontos
        );
    }

    private MembroComunidadeResponse toMembroResponse(MembroComunidadeEntity entity) {
        return new MembroComunidadeResponse(
            entity.getId(),
            entity.getUsuarioId(),
            null, // nomeUsuario - será implementado quando integrar com user-service
            entity.getComunidadeId(),
            null, // nomeComunidade - será implementado quando integrar com community-service
            entity.getTipo(),
            entity.getPontos(),
            entity.getCreatedAt()
        );
    }
}
