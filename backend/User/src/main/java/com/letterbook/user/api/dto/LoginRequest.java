package com.letterbook.user.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/**
 * RF01 - Login: DTO para autenticação de usuário com e-mail e senha
 */
public record LoginRequest(
    @NotBlank(message = "O email é obrigatório.")
    @Email(message = "O formato do email é inválido.")
    String email,
    
    @NotBlank(message = "A senha é obrigatória.")
    String senha
) {}
