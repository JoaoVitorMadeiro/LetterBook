package com.letterbook.community.api.dto;

import com.letterbook.community.domain.model.RankingEntity;
import java.time.OffsetDateTime;
import java.util.UUID;

public record RankingResponse(
    UUID id,
    UUID usuarioId,
    String nomeUsuario,
    RankingEntity.TipoRanking tipo,
    Integer pontos,
    Integer posicao,
    OffsetDateTime periodoInicio,
    OffsetDateTime periodoFim,
    OffsetDateTime createdAt
) {}
