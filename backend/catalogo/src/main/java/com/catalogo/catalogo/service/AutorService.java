package com.catalogo.catalogo.service;

import com.catalogo.catalogo.dto.AutorRequest;
import com.catalogo.catalogo.dto.AutorResponse;
import com.catalogo.catalogo.exception.DuplicateEntityException;
import com.catalogo.catalogo.exception.EntityNotFoundException;
import com.catalogo.catalogo.model.AutorEntity;
import com.catalogo.catalogo.repository.AutorRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class AutorService {

    private final AutorRepository autorRepository;

    public AutorService(AutorRepository autorRepository) {
        this.autorRepository = autorRepository;
    }

    @Transactional
    public AutorResponse criar(AutorRequest request) {
        if (request.getDataNascimento() != null && 
            autorRepository.findByNomeAndDataNascimento(request.getNome(), request.getDataNascimento()).isPresent()) {
            throw new DuplicateEntityException("Autor com nome '" + request.getNome() + 
                "' e data de nascimento '" + request.getDataNascimento() + "' já existe");
        }

        AutorEntity entity = new AutorEntity();
        BeanUtils.copyProperties(request, entity);
        entity = autorRepository.save(entity);
        return toResponse(entity);
    }

    @Transactional(readOnly = true)
    public Page<AutorResponse> listar(Pageable pageable) {
        return autorRepository.findAll(pageable).map(this::toResponse);
    }

    @Transactional(readOnly = true)
    public AutorResponse buscarPorId(UUID id) {
        AutorEntity entity = autorRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Autor não encontrado com ID: " + id));
        return toResponse(entity);
    }

    @Transactional
    public void deletar(UUID id) {
        if (!autorRepository.existsById(id)) {
            throw new EntityNotFoundException("Autor não encontrado com ID: " + id);
        }
        autorRepository.deleteById(id);
    }

    private AutorResponse toResponse(AutorEntity entity) {
        AutorResponse response = new AutorResponse();
        BeanUtils.copyProperties(entity, response);
        return response;
    }
}

