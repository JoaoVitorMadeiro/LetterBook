package com.letterbook.interaction.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.letterbook.interaction.api.dto.AvaliacaoRequest;
import com.letterbook.interaction.api.dto.AvaliacaoResponse;
import com.letterbook.interaction.application.service.AvaliacaoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AvaliacaoController.class)
public class AvaliacaoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AvaliacaoService avaliacaoService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @WithMockUser(username = "123e4567-e89b-12d3-a456-426614174000") // Valid UUID
    void criarAvaliacao_ShouldReturnCreated() throws Exception {
        UUID userId = UUID.fromString("123e4567-e89b-12d3-a456-426614174000");
        UUID livroId = UUID.randomUUID();
        AvaliacaoRequest request = new AvaliacaoRequest(livroId, 5, "Excelente!");
        
        AvaliacaoResponse response = new AvaliacaoResponse(
            UUID.randomUUID(), userId, livroId, 5, "Excelente!", 
            LocalDateTime.now(), LocalDateTime.now(), "User", "Book"
        );

        when(avaliacaoService.criarAvaliacao(eq(userId), any(AvaliacaoRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/v1/avaliacoes")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.resenha").value("Excelente!"));
    }

    @Test
    @WithMockUser(username = "123e4567-e89b-12d3-a456-426614174000")
    void listarAvaliacoesPorLivro_ShouldReturnList() throws Exception {
        UUID livroId = UUID.randomUUID();
        AvaliacaoResponse response = new AvaliacaoResponse(
            UUID.randomUUID(), UUID.randomUUID(), livroId, 5, "Top", 
            LocalDateTime.now(), LocalDateTime.now(), "User", "Book"
        );

        when(avaliacaoService.listarAvaliacoesPorLivro(livroId)).thenReturn(List.of(response));

        mockMvc.perform(get("/api/v1/avaliacoes/livro/{livroId}", livroId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].resenha").value("Top"));
    }
}