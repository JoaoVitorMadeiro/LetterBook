package com.letterbook.interaction.application.service;

import com.letterbook.interaction.api.dto.ComentarioRequest;
import com.letterbook.interaction.api.dto.ComentarioResponse;
import com.letterbook.interaction.domain.model.ComentarioEntity;
import com.letterbook.interaction.domain.repository.ComentarioRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ComentarioService {

    private final ComentarioRepository comentarioRepository;

    public ComentarioService(ComentarioRepository comentarioRepository) {
        this.comentarioRepository = comentarioRepository;
    }

    @Transactional
    public ComentarioResponse criarComentario(UUID usuarioId, ComentarioRequest request) {
        ComentarioEntity comentario = new ComentarioEntity();
        comentario.setUsuarioId(usuarioId);
        comentario.setAvaliacaoId(request.avaliacaoId());
        comentario.setTexto(request.texto());

        ComentarioEntity salvo = comentarioRepository.save(comentario);
        return toResponse(salvo);
    }

    public List<ComentarioResponse> listarComentariosPorAvaliacao(UUID avaliacaoId) {
        List<ComentarioEntity> comentarios = comentarioRepository.findByAvaliacaoId(avaliacaoId);
        return comentarios.stream()
            .map(this::toResponse)
            .collect(Collectors.toList());
    }

    public Page<ComentarioResponse> listarComentariosPorAvaliacao(UUID avaliacaoId, Pageable pageable) {
        Page<ComentarioEntity> comentarios = comentarioRepository.findByAvaliacaoId(avaliacaoId, pageable);
        return comentarios.map(this::toResponse);
    }

    public List<ComentarioResponse> listarComentariosPorUsuario(UUID usuarioId) {
        List<ComentarioEntity> comentarios = comentarioRepository.findByUsuarioId(usuarioId);
        return comentarios.stream()
            .map(this::toResponse)
            .collect(Collectors.toList());
    }

    @Transactional
    public void deletarComentario(UUID comentarioId, UUID usuarioId) {
        ComentarioEntity comentario = comentarioRepository.findById(comentarioId)
            .orElseThrow(() -> new IllegalArgumentException("Comentário não encontrado."));

        if (!comentario.getUsuarioId().equals(usuarioId)) {
            throw new IllegalArgumentException("Você só pode deletar seus próprios comentários.");
        }

        comentarioRepository.delete(comentario);
    }

    private ComentarioResponse toResponse(ComentarioEntity entity) {
        return new ComentarioResponse(
            entity.getId(),
            entity.getUsuarioId(),
            entity.getAvaliacaoId(),
            entity.getTexto(),
            entity.getCreatedAt(),
            entity.getUpdatedAt(),
            null // nomeUsuario - será implementado quando integrar com user-service
        );
    }
}
