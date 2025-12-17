package com.letterbook.interaction.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;

@Service
public class TokenService {

    @Value("${jwt.secret:MySuperSecretKeyForLetterBookAppThatMustBeVeryLongAndSecure1234567890!}") // Default or from properties
    private String secret;

    public boolean isValid(String token) {
        System.err.println("DEBUG Interaction TokenService: Validating with secret starting: " + (secret != null && secret.length() > 5 ? secret.substring(0, 5) : "null/short"));
        try {
            Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            System.err.println("DEBUG Interaction TokenService: Validation failed: " + e.getMessage());
            return false;
        }
    }

    public String getSubject(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return claims.getSubject();
    }

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }
}
