package com.letterbook.interaction.application.service;

import com.letterbook.interaction.api.dto.AvaliacaoRequest;
import com.letterbook.interaction.api.dto.AvaliacaoResponse;
import com.letterbook.interaction.api.dto.UpdateAvaliacaoRequest;
import com.letterbook.interaction.domain.model.AvaliacoesEntity;
import com.letterbook.interaction.domain.repository.AvaliacoesRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AvaliacaoService {

    private final AvaliacoesRepository avaliacoesRepository;

    public AvaliacaoService(AvaliacoesRepository avaliacoesRepository) {
        this.avaliacoesRepository = avaliacoesRepository;
    }

    @Transactional
    public AvaliacaoResponse criarAvaliacao(UUID usuarioId, AvaliacaoRequest request) {
        // Verificar se já existe uma avaliação do usuário para este livro
        Optional<AvaliacoesEntity> avaliacaoExistente = avaliacoesRepository
            .findByUsuarioIdAndLivroId(usuarioId, request.livroId());
        
        if (avaliacaoExistente.isPresent()) {
            throw new IllegalArgumentException("Você já avaliou este livro.");
        }

        AvaliacoesEntity avaliacao = new AvaliacoesEntity();
        avaliacao.setUsuarioId(usuarioId);
        avaliacao.setLivroId(request.livroId());
        avaliacao.setNota(request.nota());
        avaliacao.setResenha(request.resenha());

        AvaliacoesEntity salva = avaliacoesRepository.save(avaliacao);
        return toResponse(salva);
    }

    public List<AvaliacaoResponse> listarAvaliacoesPorLivro(UUID livroId) {
        List<AvaliacoesEntity> avaliacoes = avaliacoesRepository.findByLivroId(livroId);
        return avaliacoes.stream()
            .map(this::toResponse)
            .collect(Collectors.toList());
    }

    public List<AvaliacaoResponse> listarAvaliacoesPorUsuario(UUID usuarioId) {
        List<AvaliacoesEntity> avaliacoes = avaliacoesRepository.findByUsuarioId(usuarioId);
        return avaliacoes.stream()
            .map(this::toResponse)
            .collect(Collectors.toList());
    }

    public Optional<AvaliacaoResponse> buscarAvaliacao(UUID usuarioId, UUID livroId) {
        return avaliacoesRepository.findByUsuarioIdAndLivroId(usuarioId, livroId)
            .map(this::toResponse);
    }

    @Transactional
    public AvaliacaoResponse atualizarAvaliacao(UUID usuarioId, UUID livroId, UpdateAvaliacaoRequest request) {
        AvaliacoesEntity avaliacao = avaliacoesRepository.findByUsuarioIdAndLivroId(usuarioId, livroId)
            .orElseThrow(() -> new IllegalArgumentException("Avaliação não encontrada."));

        if (request.nota() != null) {
            avaliacao.setNota(request.nota());
        }
        if (request.resenha() != null) {
            avaliacao.setResenha(request.resenha());
        }

        AvaliacoesEntity atualizada = avaliacoesRepository.save(avaliacao);
        return toResponse(atualizada);
    }

    @Transactional
    public void deletarAvaliacao(UUID usuarioId, UUID livroId) {
        AvaliacoesEntity avaliacao = avaliacoesRepository.findByUsuarioIdAndLivroId(usuarioId, livroId)
            .orElseThrow(() -> new IllegalArgumentException("Avaliação não encontrada."));
        
        avaliacoesRepository.delete(avaliacao);
    }

    private AvaliacaoResponse toResponse(AvaliacoesEntity entity) {
        return new AvaliacaoResponse(
            entity.getId(),
            entity.getUsuarioId(),
            entity.getLivroId(),
            entity.getNota(),
            entity.getResenha(),
            entity.getCreatedAt(),
            entity.getUpdatedAt(),
            null, // nomeUsuario - será implementado quando integrar com user-service
            null  // tituloLivro - será implementado quando integrar com catalog-service
        );
    }
}
