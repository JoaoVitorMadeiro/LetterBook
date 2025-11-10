package com.letterbook.user.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/**
 * RF03 - Recuperação de Senha: DTO para solicitar recuperação de senha
 */
public record PasswordRecoveryRequest(
    @NotBlank(message = "O email é obrigatório.")
    @Email(message = "O formato do email é inválido.")
    String email
) {}

