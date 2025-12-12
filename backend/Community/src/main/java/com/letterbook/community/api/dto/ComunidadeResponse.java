package com.letterbook.community.api.dto;

import com.letterbook.community.domain.model.MembroComunidadeEntity;
import java.time.OffsetDateTime;
import java.util.UUID;

public record ComunidadeResponse(
    UUID id,
    String nome,
    String descricao,
    String imagemUrl,
    UUID criadorId,
    OffsetDateTime createdAt,
    OffsetDateTime updatedAt,
    Integer totalMembros,
    MembroComunidadeEntity.TipoMembro meuTipo,
    Integer meusPontos
) {}
