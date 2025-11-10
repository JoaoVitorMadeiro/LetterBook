package com.letterbook.user.infra.security;

import com.letterbook.user.application.usecase.TokenService;
import com.letterbook.user.domain.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Date;
import java.nio.charset.StandardCharsets;
import java.security.Key;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    private final UserRepository userRepository;
    private final JwtTokenService tokenService;

    public SecurityFilter(UserRepository userRepository, JwtTokenService tokenService) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String token = recuperarToken(request);

        if (token != null && tokenService.isValid(token)) {
            String email = tokenService.getUsername(token);
            var userOptional = userRepository.findByEmail(email);

            if (userOptional.isPresent()) {
                var user = userOptional.get();
                var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        filterChain.doFilter(request, response);
    }

    private String recuperarToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }

        return null;
    }

    @Service
    public static class JwtTokenService implements TokenService {

        @Value("${jwt.secret}")
        private String secret;

        @Value("${jwt.expiration}")
        private Long expirationMillis;

        @Override
        public String gerarToken(String email) {
            Date agora = new Date();
            Date expiraEm = new Date(agora.getTime() + expirationMillis);

            return Jwts.builder()
                    .setSubject(email)
                    .setIssuedAt(agora)
                    .setExpiration(expiraEm)
                    .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                    .compact();
        }

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

        public String getUsername(String token) {
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
}
