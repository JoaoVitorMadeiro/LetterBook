package com.letterbook.interaction.application.service;

import com.letterbook.interaction.api.dto.ListaRequest;
import com.letterbook.interaction.api.dto.ListaResponse;
import com.letterbook.interaction.domain.model.ListaEntity;
import com.letterbook.interaction.domain.repository.ListaRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ListaService {

    private final ListaRepository listaRepository;

    public ListaService(ListaRepository listaRepository) {
        this.listaRepository = listaRepository;
    }

    @Transactional
    public ListaResponse criarLista(UUID usuarioId, ListaRequest request) {
        ListaEntity entity = new ListaEntity();
        BeanUtils.copyProperties(request, entity);
        entity.setUsuarioId(usuarioId);
        
        // Ensure default type if null
        if (entity.getTipo() == null) {
            entity.setTipo("PUBLIC");
        }

        entity = listaRepository.save(entity);
        return toResponse(entity);
    }

    @Transactional(readOnly = true)
    public List<ListaResponse> listarListasPorUsuario(UUID usuarioId) {
        return listaRepository.findByUsuarioId(usuarioId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public ListaResponse atualizarLista(UUID usuarioId, UUID listaId, ListaRequest request) {
        ListaEntity entity = listaRepository.findById(listaId)
                .orElseThrow(() -> new RuntimeException("Lista não encontrada")); // Should use custom exception

        if (!entity.getUsuarioId().equals(usuarioId)) {
             throw new RuntimeException("Acesso negado");
        }

        BeanUtils.copyProperties(request, entity, "id", "usuarioId", "createdAt");
        
        entity = listaRepository.save(entity);
        return toResponse(entity);
    }

    private ListaResponse toResponse(ListaEntity entity) {
        ListaResponse response = new ListaResponse();
        BeanUtils.copyProperties(entity, response);
        return response;
    }
}
