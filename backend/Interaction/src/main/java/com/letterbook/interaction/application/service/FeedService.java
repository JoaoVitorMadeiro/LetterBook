package com.letterbook.interaction.application.service;

import com.letterbook.interaction.api.dto.FeedItemResponse;
import com.letterbook.interaction.domain.model.AvaliacoesEntity;
import com.letterbook.interaction.domain.model.ComentarioEntity;
import com.letterbook.interaction.domain.repository.AvaliacoesRepository;
import com.letterbook.interaction.domain.repository.ComentarioRepository;
import com.letterbook.interaction.domain.repository.CurtidaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class FeedService {

    private final AvaliacoesRepository avaliacoesRepository;
    private final ComentarioRepository comentarioRepository;
    private final CurtidaRepository curtidaRepository;

    public FeedService(AvaliacoesRepository avaliacoesRepository,
                      ComentarioRepository comentarioRepository,
                      CurtidaRepository curtidaRepository) {
        this.avaliacoesRepository = avaliacoesRepository;
        this.comentarioRepository = comentarioRepository;
        this.curtidaRepository = curtidaRepository;
    }

    public Page<FeedItemResponse> buscarFeedSocial(UUID usuarioId, Pageable pageable) {
        // Buscar avaliações dos usuários seguidos (simulado - em produção, integrar com user-service)
        List<AvaliacoesEntity> avaliacoesRecentes = avaliacoesRepository.findAll()
            .stream()
            .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
            .collect(Collectors.toList());

        List<FeedItemResponse> feedItems = new ArrayList<>();

        for (AvaliacoesEntity avaliacao : avaliacoesRecentes) {
            // Contar curtidas e comentários
            Long totalCurtidas = curtidaRepository.countByAvaliacaoId(avaliacao.getId());
            List<ComentarioEntity> comentarios = comentarioRepository.findByAvaliacaoId(avaliacao.getId());
            Integer totalComentarios = comentarios.size();

            // Verificar se o usuário atual curtiu esta avaliação
            boolean curtidoPorMim = curtidaRepository.existsByUsuarioIdAndAvaliacaoId(usuarioId, avaliacao.getId());

            FeedItemResponse feedItem = new FeedItemResponse(
                avaliacao.getId(),
                "AVALIACAO",
                avaliacao.getUsuarioId(),
                null, // nomeUsuario - será implementado quando integrar com user-service
                null, // fotoUsuario - será implementado quando integrar com user-service
                avaliacao.getLivroId(),
                null, // tituloLivro - será implementado quando integrar com catalog-service
                null, // capaLivro - será implementado quando integrar com catalog-service
                avaliacao.getNota(),
                avaliacao.getResenha(),
                null,
                avaliacao.getId(),
                totalCurtidas.intValue(),
                totalComentarios,
                avaliacao.getCreatedAt(),
                curtidoPorMim
            );

            feedItems.add(feedItem);

            // Adicionar comentários recentes como itens do feed
            List<ComentarioEntity> comentariosRecentes = comentarios.stream()
                .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                .limit(3) // Máximo 3 comentários por avaliação no feed
                .collect(Collectors.toList());

            for (ComentarioEntity comentario : comentariosRecentes) {
                FeedItemResponse comentarioFeedItem = new FeedItemResponse(
                    comentario.getId(),
                    "COMENTARIO",
                    comentario.getUsuarioId(),
                    null, // nomeUsuario - será implementado quando integrar com user-service
                    null, // fotoUsuario - será implementado quando integrar com user-service
                    avaliacao.getLivroId(),
                    null, // tituloLivro - será implementado quando integrar com catalog-service
                    null, // capaLivro - será implementado quando integrar com catalog-service
                    avaliacao.getNota(),
                    null,
                    comentario.getTexto(),
                    avaliacao.getId(),
                    totalCurtidas.intValue(),
                    totalComentarios,
                    comentario.getCreatedAt(),
                    curtidoPorMim
                );

                feedItems.add(comentarioFeedItem);
            }
        }

        // Ordenar por data de criação (mais recentes primeiro)
        feedItems.sort((a, b) -> b.createdAt().compareTo(a.createdAt()));

        // Aplicar paginação
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), feedItems.size());
        List<FeedItemResponse> pageContent = start >= feedItems.size() ? 
            new ArrayList<>() : 
            feedItems.subList(start, end);

        return new PageImpl<>(pageContent, pageable, feedItems.size());
    }

    public Page<FeedItemResponse> buscarFeedPorUsuario(UUID usuarioId, Pageable pageable) {
        // Buscar apenas avaliações do usuário específico
        List<AvaliacoesEntity> avaliacoesUsuario = avaliacoesRepository.findByUsuarioId(usuarioId);

        List<FeedItemResponse> feedItems = new ArrayList<>();

        for (AvaliacoesEntity avaliacao : avaliacoesUsuario) {
            Long totalCurtidas = curtidaRepository.countByAvaliacaoId(avaliacao.getId());
            List<ComentarioEntity> comentarios = comentarioRepository.findByAvaliacaoId(avaliacao.getId());
            Integer totalComentarios = comentarios.size();

            FeedItemResponse feedItem = new FeedItemResponse(
                avaliacao.getId(),
                "AVALIACAO",
                avaliacao.getUsuarioId(),
                null, // nomeUsuario - será implementado quando integrar com user-service
                null, // fotoUsuario - será implementado quando integrar com user-service
                avaliacao.getLivroId(),
                null, // tituloLivro - será implementado quando integrar com catalog-service
                null, // capaLivro - será implementado quando integrar com catalog-service
                avaliacao.getNota(),
                avaliacao.getResenha(),
                null,
                avaliacao.getId(),
                totalCurtidas.intValue(),
                totalComentarios,
                avaliacao.getCreatedAt(),
                false // Não aplicável para feed de usuário específico
            );

            feedItems.add(feedItem);
        }

        // Ordenar por data de criação (mais recentes primeiro)
        feedItems.sort((a, b) -> b.createdAt().compareTo(a.createdAt()));

        // Aplicar paginação
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), feedItems.size());
        List<FeedItemResponse> pageContent = start >= feedItems.size() ? 
            new ArrayList<>() : 
            feedItems.subList(start, end);

        return new PageImpl<>(pageContent, pageable, feedItems.size());
    }
}
