package com.letterbook.user.infra.security;

import com.letterbook.user.application.usecase.TokenService;
import com.letterbook.user.domain.model.UserEntity;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Service
public class JwtTokenService implements TokenService {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private Long expirationMillis;

    @Override
    public String gerarToken(UserEntity user) {
        System.out.println("User Service Secret starts with: " + (secret != null && secret.length() > 5 ? secret.substring(0, 5) : "null/short"));
        Date agora = new Date();
        Date expiraEm = new Date(agora.getTime() + expirationMillis);

        return Jwts.builder()
                .setSubject(user.getId().toString())
                .claim("email", user.getEmail())
                .setIssuedAt(agora)
                .setExpiration(expiraEm)
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    @Override
    public boolean isValid(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    @Override
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
