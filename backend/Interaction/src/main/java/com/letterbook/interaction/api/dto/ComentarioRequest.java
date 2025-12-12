package com.letterbook.interaction.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ComentarioRequest(
    @NotNull(message = "ID da avaliação é obrigatório")
    java.util.UUID avaliacaoId,
    
    @NotBlank(message = "Texto do comentário é obrigatório")
    @Size(max = 500, message = "Comentário deve ter no máximo 500 caracteres")
    String texto
) {}
