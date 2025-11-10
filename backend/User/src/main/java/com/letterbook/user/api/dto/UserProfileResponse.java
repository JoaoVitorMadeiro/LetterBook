package com.letterbook.user.api.dto;

import java.time.OffsetDateTime;
import java.util.UUID;

/**
 * RF04 - Perfil: DTO com informações completas do perfil do usuário
 */
public record UserProfileResponse(
    UUID id,
    String nome,
    String email,
    String fotoUrl,
    String biografia,
    OffsetDateTime createdAt,
    OffsetDateTime updatedAt,
    Integer totalSeguidores,
    Integer totalSeguindo,
    Integer totalLivrosLidos,  // Será populado quando integrar com catalog-service
    Integer totalAvaliacoes    // Será populado quando integrar com interaction-service
) {}
