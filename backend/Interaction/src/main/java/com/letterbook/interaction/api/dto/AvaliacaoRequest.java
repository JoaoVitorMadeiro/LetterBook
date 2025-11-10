package com.letterbook.interaction.api.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AvaliacaoRequest(
    @NotNull(message = "ID do livro é obrigatório")
    java.util.UUID livroId,
    
    @NotNull(message = "Nota é obrigatória")
    @Min(value = 1, message = "Nota deve ser entre 1 e 5")
    @Max(value = 5, message = "Nota deve ser entre 1 e 5")
    Integer nota,
    
    @Size(max = 2000, message = "Resenha deve ter no máximo 2000 caracteres")
    String resenha
) {}
