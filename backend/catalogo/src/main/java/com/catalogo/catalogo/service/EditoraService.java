package com.catalogo.catalogo.service;

import com.catalogo.catalogo.dto.EditoraRequest;
import com.catalogo.catalogo.dto.EditoraResponse;
import com.catalogo.catalogo.exception.DuplicateEntityException;
import com.catalogo.catalogo.exception.EntityNotFoundException;
import com.catalogo.catalogo.model.EditoraEntity;
import com.catalogo.catalogo.repository.EditoraRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class EditoraService {

    private final EditoraRepository editoraRepository;

    public EditoraService(EditoraRepository editoraRepository) {
        this.editoraRepository = editoraRepository;
    }

    @Transactional
    public EditoraResponse criar(EditoraRequest request) {
        if (editoraRepository.findByNome(request.getNome()).isPresent()) {
            throw new DuplicateEntityException("Editora com nome '" + request.getNome() + "' já existe");
        }

        EditoraEntity entity = new EditoraEntity();
        BeanUtils.copyProperties(request, entity);
        entity = editoraRepository.save(entity);
        return toResponse(entity);
    }

    @Transactional(readOnly = true)
    public Page<EditoraResponse> listar(Pageable pageable) {
        return editoraRepository.findAll(pageable).map(this::toResponse);
    }

    @Transactional(readOnly = true)
    public EditoraResponse buscarPorId(UUID id) {
        EditoraEntity entity = editoraRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Editora não encontrada com ID: " + id));
        return toResponse(entity);
    }

    @Transactional
    public void deletar(UUID id) {
        if (!editoraRepository.existsById(id)) {
            throw new EntityNotFoundException("Editora não encontrada com ID: " + id);
        }
        editoraRepository.deleteById(id);
    }

    private EditoraResponse toResponse(EditoraEntity entity) {
        EditoraResponse response = new EditoraResponse();
        BeanUtils.copyProperties(entity, response);
        return response;
    }
}

