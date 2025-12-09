package com.letterbook.community.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.letterbook.community.api.dto.ComunidadeRequest;
import com.letterbook.community.api.dto.ComunidadeResponse;
import com.letterbook.community.application.service.ComunidadeService;
import com.letterbook.community.domain.model.MembroComunidadeEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ComunidadeController.class)
public class ComunidadeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ComunidadeService comunidadeService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @WithMockUser(username = "123e4567-e89b-12d3-a456-426614174000")
    void criarComunidade_ShouldReturnCreated() throws Exception {
        UUID userId = UUID.fromString("123e4567-e89b-12d3-a456-426614174000");
        ComunidadeRequest request = new ComunidadeRequest("Comunidade Teste", "Descricao", "url");
        
        ComunidadeResponse response = new ComunidadeResponse(
            UUID.randomUUID(), "Comunidade Teste", "Descricao", "url", userId, 
            OffsetDateTime.now(), OffsetDateTime.now(), 1, MembroComunidadeEntity.TipoMembro.ADMIN, 0
        );

        when(comunidadeService.criarComunidade(eq(userId), any(ComunidadeRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/v1/comunidades")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.nome").value("Comunidade Teste"));
    }

    @Test
    @WithMockUser(username = "123e4567-e89b-12d3-a456-426614174000")
    void listarComunidades_ShouldReturnPage() throws Exception {
        ComunidadeResponse response = new ComunidadeResponse(
            UUID.randomUUID(), "Comunidade 1", "Desc", "url", UUID.randomUUID(), 
            OffsetDateTime.now(), OffsetDateTime.now(), 10, null, 0
        );
        Page<ComunidadeResponse> page = new PageImpl<>(List.of(response));

        when(comunidadeService.listarComunidades(any(), any(Pageable.class), any())).thenReturn(page);

        mockMvc.perform(get("/api/v1/comunidades"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].nome").value("Comunidade 1"));
    }
}