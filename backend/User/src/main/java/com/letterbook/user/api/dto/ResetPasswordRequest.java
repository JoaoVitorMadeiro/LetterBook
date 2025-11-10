package com.letterbook.user.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * RF03 - Recuperação de Senha: DTO para redefinir senha usando token
 */
public record ResetPasswordRequest(
    @NotBlank(message = "O token é obrigatório.")
    String token,
    
    @NotBlank(message = "A nova senha é obrigatória.")
    @Size(min = 8, message = "A senha deve ter no mínimo 8 caracteres.")
    String novaSenha
) {}

