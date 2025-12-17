package com.letterbook.community.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;

@Service
public class TokenService {

    @Value("${jwt.secret:MySuperSecretKeyForLetterBookAppThatMustBeVeryLongAndSecure1234567890!}")
    private String secret;

    public boolean isValid(String token) {
        System.err.println("DEBUG Community TokenService: Validating with secret starting: " + (secret != null && secret.length() > 5 ? secret.substring(0, 5) : "null/short"));
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            System.err.println("DEBUG Community TokenService: Validation failed: " + e.getMessage());
            return false;
        }
    }

    public String getSubject(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }
}
