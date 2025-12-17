package com.catalogo.catalogo.controller;

import com.catalogo.catalogo.dto.LivroRequest;
import com.catalogo.catalogo.dto.LivroResponse;
import com.catalogo.catalogo.service.LivroService;
import com.fasterxml.jackson.databind.ObjectMapper;
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

import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(LivroController.class)
public class LivroControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private LivroService livroService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @WithMockUser
    void criar_ShouldReturnCreated() throws Exception {
        LivroRequest request = new LivroRequest();
        request.setTitulo("Livro Teste");
        
        LivroResponse response = new LivroResponse();
        response.setId(UUID.randomUUID());
        response.setTitulo("Livro Teste");

        when(livroService.criar(any(LivroRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/v1/livros")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.titulo").value("Livro Teste"));
    }

    @Test
    @WithMockUser
    void listar_ShouldReturnPage() throws Exception {
        LivroResponse livro = new LivroResponse();
        livro.setTitulo("Livro 1");
        Page<LivroResponse> page = new PageImpl<>(List.of(livro));

        when(livroService.listar(any(Pageable.class), any(), any(), any(), any())).thenReturn(page);

        mockMvc.perform(get("/api/v1/livros"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].titulo").value("Livro 1"));
    }

    @Test
    @WithMockUser
    void buscarPorId_ShouldReturnLivro() throws Exception {
        UUID id = UUID.randomUUID();
        LivroResponse response = new LivroResponse();
        response.setId(id);

        when(livroService.buscarPorId(id)).thenReturn(response);

        mockMvc.perform(get("/api/v1/livros/{id}", id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id.toString()));
    }

    @Test
    @WithMockUser
    void deletar_ShouldReturnNoContent() throws Exception {
        UUID id = UUID.randomUUID();
        doNothing().when(livroService).deletar(id);

        mockMvc.perform(delete("/api/v1/livros/{id}", id)
                .with(csrf()))
                .andExpect(status().isNoContent());
    }
}