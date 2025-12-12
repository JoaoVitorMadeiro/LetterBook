package com.letterbook.community.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ComunidadeRequest(
    @NotBlank(message = "Nome é obrigatório")
    @Size(max = 100, message = "Nome deve ter no máximo 100 caracteres")
    String nome,
    
    @Size(max = 500, message = "Descrição deve ter no máximo 500 caracteres")
    String descricao,
    
    @Size(max = 255, message = "URL da imagem deve ter no máximo 255 caracteres")
    String imagemUrl
) {}
