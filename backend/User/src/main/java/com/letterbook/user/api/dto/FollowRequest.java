package com.letterbook.user.api.dto;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public record FollowRequest(
    @NotNull(message = "ID do usuário é obrigatório")
    UUID usuarioId
) {}
