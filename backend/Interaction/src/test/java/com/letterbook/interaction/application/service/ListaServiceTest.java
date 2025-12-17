package com.letterbook.interaction.application.service;

import com.letterbook.interaction.api.dto.ListaRequest;
import com.letterbook.interaction.api.dto.ListaResponse;
import com.letterbook.interaction.domain.model.ListaEntity;
import com.letterbook.interaction.domain.repository.ListaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

class ListaServiceTest {

    @Mock
    private ListaRepository listaRepository;

    @InjectMocks
    private ListaService listaService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void criarLista_ShouldReturnListaResponse() {
        UUID usuarioId = UUID.randomUUID();
        ListaRequest request = new ListaRequest();
        request.setNome("My List");
        request.setTipo("PUBLIC");

        ListaEntity entity = new ListaEntity();
        entity.setId(UUID.randomUUID());
        entity.setNome("My List");
        entity.setUsuarioId(usuarioId);
        entity.setTipo("PUBLIC");

        when(listaRepository.save(any(ListaEntity.class))).thenReturn(entity);

        ListaResponse response = listaService.criarLista(usuarioId, request);

        assertNotNull(response);
        assertEquals("My List", response.getNome());
        assertEquals(usuarioId, response.getUsuarioId());
    }
}
