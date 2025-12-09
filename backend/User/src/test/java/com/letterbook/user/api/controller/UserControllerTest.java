package com.letterbook.user.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.letterbook.user.api.dto.CadastroRequest;
import com.letterbook.user.api.dto.UpdateProfileRequest;
import com.letterbook.user.api.dto.UserProfileResponse;
import com.letterbook.user.application.usecase.UserUseCase;
import com.letterbook.user.domain.model.UserEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import java.time.OffsetDateTime;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
public class UserControllerTest {

    private MockMvc mockMvc;

    @Autowired
    private UserController userController;

    @MockBean
    private UserUseCase userUseCase;

    @MockBean
    private com.letterbook.user.domain.repository.UserRepository userRepository;

    @MockBean
    private com.letterbook.user.application.usecase.TokenService tokenService;

    @Autowired
    private ObjectMapper objectMapper;

    private UserEntity mockUser;
    private Authentication mockAuth;

    @BeforeEach
    void setUp() {
        mockUser = new UserEntity();
        mockUser.setId(UUID.randomUUID());
        mockUser.setNome("Test User");
        mockUser.setEmail("test@example.com");
        mockUser.setSenha("password");
        
        mockAuth = new UsernamePasswordAuthenticationToken(mockUser, null, mockUser.getAuthorities());

        mockMvc = MockMvcBuilders.standaloneSetup(userController)
                .setCustomArgumentResolvers(new HandlerMethodArgumentResolver() {
                    @Override
                    public boolean supportsParameter(MethodParameter parameter) {
                        return Authentication.class.isAssignableFrom(parameter.getParameterType());
                    }

                    @Override
                    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {
                        return mockAuth;
                    }
                })
                .build();
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

        mockMvc.perform(get("/api/v1/usuarios/me/profile"))
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

        mockMvc.perform(get("/api/v1/usuarios/{usuarioId}/profile", otherUserId))
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
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome").value("Updated Name"));
    }
}