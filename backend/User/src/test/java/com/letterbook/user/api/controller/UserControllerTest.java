package com.letterbook.user.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.letterbook.user.api.dto.CadastroRequest;
import com.letterbook.user.api.dto.UpdateProfileRequest;
import com.letterbook.user.api.dto.UserProfileResponse;
import com.letterbook.user.application.usecase.UserUseCase;
import com.letterbook.user.domain.model.UserEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.OffsetDateTime;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

    private MockMvc mockMvc;

    @InjectMocks
    private UserController userController;

    @Mock
    private UserUseCase userUseCase;

    private ObjectMapper objectMapper;

    private UserEntity mockUser;
    private Authentication mockAuth;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());

        mockUser = new UserEntity();
        mockUser.setId(UUID.randomUUID());
        mockUser.setNome("Test User");
        mockUser.setEmail("test@example.com");
        mockUser.setSenha("password");
        
        mockAuth = new UsernamePasswordAuthenticationToken(mockUser, null, mockUser.getAuthorities());

        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    void cadastrar_ShouldReturnCreated() throws Exception {
        CadastroRequest request = new CadastroRequest("Test User", "test@example.com", "password123");
        
        when(userUseCase.cadastrar(any(CadastroRequest.class))).thenReturn(mockUser);

        mockMvc.perform(post("/api/v1/usuarios/cadastro")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(content().string("Usuário cadastrado com sucesso."));
    }

    @Test
    void buscarMeuPerfil_ShouldReturnProfile() throws Exception {
        UserProfileResponse response = new UserProfileResponse(
                mockUser.getId(), mockUser.getNome(), mockUser.getEmail(), null, null,
                OffsetDateTime.now(), OffsetDateTime.now(), 0, 0, 0, 0
        );

        when(userUseCase.buscarPerfilProprio(mockUser.getId())).thenReturn(response);

        mockMvc.perform(get("/api/v1/usuarios/me/profile")
                .principal(mockAuth)) // Inject Authentication directly
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value(mockUser.getEmail()));
    }

    @Test
    void buscarPerfilOutroUsuario_ShouldReturnProfile() throws Exception {
        UUID otherUserId = UUID.randomUUID();
        UserProfileResponse response = new UserProfileResponse(
                otherUserId, "Other User", "other@example.com", null, null,
                OffsetDateTime.now(), OffsetDateTime.now(), 0, 0, 0, 0
        );

        when(userUseCase.buscarPerfilOutroUsuario(eq(otherUserId), eq(mockUser.getId()))).thenReturn(response);

        mockMvc.perform(get("/api/v1/usuarios/{usuarioId}/profile", otherUserId)
                .principal(mockAuth)) // Inject Authentication
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("other@example.com"));
    }

    @Test
    void atualizarPerfil_ShouldReturnUpdatedProfile() throws Exception {
        UpdateProfileRequest request = new UpdateProfileRequest("Updated Name", "bio", "url");
        UserProfileResponse response = new UserProfileResponse(
                mockUser.getId(), "Updated Name", mockUser.getEmail(), "url", "bio",
                OffsetDateTime.now(), OffsetDateTime.now(), 0, 0, 0, 0
        );

        when(userUseCase.atualizarPerfil(eq(mockUser.getId()), any(UpdateProfileRequest.class))).thenReturn(response);

        mockMvc.perform(put("/api/v1/usuarios/me/profile")
                .principal(mockAuth) // Inject Authentication
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome").value("Updated Name"));
    }
}
