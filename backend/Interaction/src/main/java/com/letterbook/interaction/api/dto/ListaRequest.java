package com.letterbook.interaction.api.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.Set;
import java.util.UUID;

@Data
public class ListaRequest {
    @NotBlank
    private String nome;
    private String descricao;
    private String tipo = "PUBLIC";
    private String tags;
    private Set<UUID> livrosIds;
}
