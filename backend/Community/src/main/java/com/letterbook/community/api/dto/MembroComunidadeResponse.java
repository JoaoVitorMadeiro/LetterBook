package com.letterbook.community.api.dto;

import com.letterbook.community.domain.model.MembroComunidadeEntity;
import java.time.OffsetDateTime;
import java.util.UUID;

public record MembroComunidadeResponse(
    UUID id,
    UUID usuarioId,
    String nomeUsuario,
    UUID comunidadeId,
    String nomeComunidade,
    MembroComunidadeEntity.TipoMembro tipo,
    Integer pontos,
    OffsetDateTime createdAt
) {}
