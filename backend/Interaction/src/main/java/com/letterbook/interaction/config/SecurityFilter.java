package com.letterbook.interaction.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    private final TokenService tokenService;

    public SecurityFilter(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = recuperarToken(request);
        System.err.println("DEBUG Interaction Filter: Token found? " + (token != null));

        if (token != null) {
            boolean isValid = tokenService.isValid(token);
            System.err.println("DEBUG Interaction Filter: Token valid? " + isValid);
            if (isValid) {
                String userId = tokenService.getSubject(token);
                var authentication = new UsernamePasswordAuthenticationToken(userId, null, Collections.emptyList());
                SecurityContextHolder.getContext().setAuthentication(authentication);
                System.err.println("DEBUG Interaction Filter: Auth set. Authenticated? " + authentication.isAuthenticated());
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
}
