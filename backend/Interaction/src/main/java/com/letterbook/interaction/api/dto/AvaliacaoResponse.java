package com.letterbook.interaction.api.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record AvaliacaoResponse(
    UUID id,
    UUID usuarioId,
    UUID livroId,
    Integer nota,
    String resenha,
    LocalDateTime createdAt,
    LocalDateTime updatedAt,
    String nomeUsuario,
    String tituloLivro
) {}
