package com.catalogo.catalogo.service;

import com.catalogo.catalogo.dto.GeneroRequest;
import com.catalogo.catalogo.dto.GeneroResponse;
import com.catalogo.catalogo.exception.DuplicateEntityException;
import com.catalogo.catalogo.exception.EntityNotFoundException;
import com.catalogo.catalogo.model.GeneroEntity;
import com.catalogo.catalogo.repository.GeneroRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class GeneroService {

    private final GeneroRepository generoRepository;

    public GeneroService(GeneroRepository generoRepository) {
        this.generoRepository = generoRepository;
    }

    @Transactional
    public GeneroResponse criar(GeneroRequest request) {
        if (generoRepository.findByNome(request.getNome()).isPresent()) {
            throw new DuplicateEntityException("Gênero com nome '" + request.getNome() + "' já existe");
        }

        GeneroEntity entity = new GeneroEntity();
        BeanUtils.copyProperties(request, entity);
        entity = generoRepository.save(entity);
        return toResponse(entity);
    }

    @Transactional(readOnly = true)
    public Page<GeneroResponse> listar(Pageable pageable) {
        return generoRepository.findAll(pageable).map(this::toResponse);
    }

    @Transactional(readOnly = true)
    public GeneroResponse buscarPorId(UUID id) {
        GeneroEntity entity = generoRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Gênero não encontrado com ID: " + id));
        return toResponse(entity);
    }

    @Transactional
    public void deletar(UUID id) {
        if (!generoRepository.existsById(id)) {
            throw new EntityNotFoundException("Gênero não encontrado com ID: " + id);
        }
        generoRepository.deleteById(id);
    }

    private GeneroResponse toResponse(GeneroEntity entity) {
        GeneroResponse response = new GeneroResponse();
        BeanUtils.copyProperties(entity, response);
        return response;
    }
}

