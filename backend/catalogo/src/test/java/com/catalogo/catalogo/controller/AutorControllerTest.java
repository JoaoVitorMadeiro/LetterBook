package com.catalogo.catalogo.controller;

import com.catalogo.catalogo.dto.AutorRequest;
import com.catalogo.catalogo.dto.AutorResponse;
import com.catalogo.catalogo.service.AutorService;
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

@WebMvcTest(AutorController.class)
public class AutorControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AutorService autorService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @WithMockUser
    void criar_ShouldReturnCreated() throws Exception {
        AutorRequest request = new AutorRequest();
        request.setNome("Autor Teste");
        
        AutorResponse response = new AutorResponse();
        response.setId(UUID.randomUUID());
        response.setNome("Autor Teste");

        when(autorService.criar(any(AutorRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/v1/autores")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.nome").value("Autor Teste"));
    }

    @Test
    @WithMockUser
    void listar_ShouldReturnPage() throws Exception {
        AutorResponse autor = new AutorResponse();
        autor.setNome("Autor 1");
        Page<AutorResponse> page = new PageImpl<>(List.of(autor));

        when(autorService.listar(any(Pageable.class))).thenReturn(page);

        mockMvc.perform(get("/api/v1/autores"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].nome").value("Autor 1"));
    }

    @Test
    @WithMockUser
    void buscarPorId_ShouldReturnAutor() throws Exception {
        UUID id = UUID.randomUUID();
        AutorResponse response = new AutorResponse();
        response.setId(id);
        response.setNome("Autor Encontrado");

        when(autorService.buscarPorId(id)).thenReturn(response);

        mockMvc.perform(get("/api/v1/autores/{id}", id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id.toString()))
                .andExpect(jsonPath("$.nome").value("Autor Encontrado"));
    }

    @Test
    @WithMockUser
    void deletar_ShouldReturnNoContent() throws Exception {
        UUID id = UUID.randomUUID();
        doNothing().when(autorService).deletar(id);

        mockMvc.perform(delete("/api/v1/autores/{id}", id)
                .with(csrf()))
                .andExpect(status().isNoContent());
    }
}
