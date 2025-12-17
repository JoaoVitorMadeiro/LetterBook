package com.letterbook.interaction.api.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Data
public class ListaResponse {
    private UUID id;
    private UUID usuarioId;
    private String nome;
    private String descricao;
    private String tipo;
    private String tags;
    private Set<UUID> livrosIds;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
