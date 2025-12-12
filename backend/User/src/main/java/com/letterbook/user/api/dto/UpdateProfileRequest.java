package com.letterbook.user.api.dto;

import jakarta.validation.constraints.Size;

/**
 * RF04 - Perfil: DTO para atualização de informações do perfil
 */
public record UpdateProfileRequest(
    @Size(max = 100, message = "O nome deve ter no máximo 100 caracteres.")
    String nome,
    
    @Size(max = 500, message = "A biografia deve ter no máximo 500 caracteres.")
    String biografia,
    
    String fotoUrl
) {}
