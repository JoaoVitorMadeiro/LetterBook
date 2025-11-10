package com.letterbook.user.application.usecase;

public interface TokenService {
    String gerarToken(String subject);
    boolean isValid(String token);
    String getUsername(String token);
}


