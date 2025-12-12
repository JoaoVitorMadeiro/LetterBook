package com.letterbook.user.application.usecase;

import com.letterbook.user.domain.model.UserEntity;

public interface TokenService {
    String gerarToken(UserEntity user);
    boolean isValid(String token);
    String getSubject(String token);
}


