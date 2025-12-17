package com.letterbook.user.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.letterbook.user.api.dto.CadastroRequest;
import com.letterbook.user.api.dto.LoginRequest;
import com.letterbook.user.api.dto.PasswordRecoveryRequest;
import com.letterbook.user.api.dto.ResetPasswordRequest;
import com.letterbook.user.application.usecase.TokenService;
import com.letterbook.user.application.usecase.UserUseCase;
import com.letterbook.user.domain.model.UserEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.test.web.servlet.MockMvc;

import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc(addFilters = false)
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthenticationManager authenticationManager;

    @MockBean
    private TokenService tokenService;

    @MockBean
    private UserUseCase userUseCase;

    @MockBean
    private com.letterbook.user.domain.repository.UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private UserEntity mockUser;

    @BeforeEach
    void setUp() {
        mockUser = new UserEntity();
        mockUser.setId(UUID.randomUUID());
        mockUser.setEmail("test@example.com");
        mockUser.setSenha("encodedPassword");
        mockUser.setNome("Test User");
    }

    @Test
    void register_ShouldReturnNoContent() throws Exception {
        CadastroRequest request = new CadastroRequest("Test User", "test@example.com", "password123");

        mockMvc.perform(post("/api/v1/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNoContent());
    }

    @Test
    void login_ShouldReturnToken() throws Exception {
        LoginRequest request = new LoginRequest("test@example.com", "password123");
        String expectedToken = "valid.jwt.token";

        Authentication authentication = mock(Authentication.class);
        when(authentication.getPrincipal()).thenReturn(mockUser);
        
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authentication);
        when(tokenService.gerarToken(any(UserEntity.class))).thenReturn(expectedToken);

        mockMvc.perform(post("/api/v1/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value(expectedToken));
    }

    @Test
    void forgotPassword_ShouldReturnOk() throws Exception {
        PasswordRecoveryRequest request = new PasswordRecoveryRequest("test@example.com");

        mockMvc.perform(post("/api/v1/auth/forgot-password")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(content().string("Se o email estiver cadastrado, você receberá instruções para recuperação da senha."));
    }

    @Test
    void resetPassword_ShouldReturnOk() throws Exception {
        ResetPasswordRequest request = new ResetPasswordRequest("reset-token", "newPassword123");

        mockMvc.perform(post("/api/v1/auth/reset-password")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(content().string("Senha redefinida com sucesso."));
    }
}