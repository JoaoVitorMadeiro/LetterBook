package com.letterbook.user.infra.security;

import com.letterbook.user.domain.model.UserEntity;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

class JwtTokenServiceTest {

    private JwtTokenService jwtTokenService;
    private UserEntity mockUser;
    private final String SECRET = "MySuperSecretKeyForLetterBookAppThatMustBeVeryLongAndSecure1234567890!";
    private final Long EXPIRATION = 3600000L; // 1 hour

    @BeforeEach
    void setUp() {
        jwtTokenService = new JwtTokenService();
        ReflectionTestUtils.setField(jwtTokenService, "secret", SECRET);
        ReflectionTestUtils.setField(jwtTokenService, "expirationMillis", EXPIRATION);

        mockUser = new UserEntity();
        mockUser.setId(UUID.randomUUID());
        mockUser.setEmail("test@example.com");
    }

    @Test
    void gerarToken_ShouldGenerateValidToken() {
        String token = jwtTokenService.gerarToken(mockUser);

        assertNotNull(token);
        assertFalse(token.isEmpty());
        assertTrue(jwtTokenService.isValid(token));
    }

    @Test
    void isValid_ShouldReturnTrueForValidToken() {
        String token = jwtTokenService.gerarToken(mockUser);
        assertTrue(jwtTokenService.isValid(token));
    }

    @Test
    void isValid_ShouldReturnFalseForInvalidToken() {
        String invalidToken = "invalid.token.string";
        assertFalse(jwtTokenService.isValid(invalidToken));
    }

    @Test
    void isValid_ShouldReturnFalseForExpiredToken() {
        // Create an expired token manually
        Date past = new Date(System.currentTimeMillis() - 10000);
        String expiredToken = Jwts.builder()
                .setSubject(mockUser.getId().toString())
                .setExpiration(past)
                .signWith(Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8)), SignatureAlgorithm.HS256)
                .compact();

        assertFalse(jwtTokenService.isValid(expiredToken));
    }

    @Test
    void getSubject_ShouldReturnUserId() {
        String token = jwtTokenService.gerarToken(mockUser);
        String subject = jwtTokenService.getSubject(token);

        assertEquals(mockUser.getId().toString(), subject);
    }
}
