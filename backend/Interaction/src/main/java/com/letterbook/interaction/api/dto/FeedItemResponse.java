package com.letterbook.interaction.api.dto;

import java.time.LocalDateTime;

import java.util.UUID;

public record FeedItemResponse(
    UUID id,
    String tipo, // "AVALIACAO", "COMENTARIO", "CURTIDA"
    UUID usuarioId,
    String nomeUsuario,
    String fotoUsuario,
    UUID livroId,
    String tituloLivro,
    String capaLivro,
    Integer nota,
    String resenha,
    String comentario,
    UUID avaliacaoId,
    Integer totalCurtidas,
    Integer totalComentarios,
    LocalDateTime createdAt,
    boolean curtidoPorMim
) {}
