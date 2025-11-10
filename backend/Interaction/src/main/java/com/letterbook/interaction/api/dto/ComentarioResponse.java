package com.letterbook.interaction.api.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record ComentarioResponse(
    UUID id,
    UUID usuarioId,
    UUID avaliacaoId,
    String texto,
    LocalDateTime createdAt,
    LocalDateTime updatedAt,
    String nomeUsuario
) {}
