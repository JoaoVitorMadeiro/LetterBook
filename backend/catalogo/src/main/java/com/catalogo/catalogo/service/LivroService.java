package com.catalogo.catalogo.service;

import com.catalogo.catalogo.dto.*;
import com.catalogo.catalogo.exception.EntityNotFoundException;
import com.catalogo.catalogo.model.*;
import com.catalogo.catalogo.repository.*;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class LivroService {

    private final LivroRepository livroRepository;
    private final AutorRepository autorRepository;
    private final EditoraRepository editoraRepository;
    private final GeneroRepository generoRepository;

    public LivroService(
            LivroRepository livroRepository,
            AutorRepository autorRepository,
            EditoraRepository editoraRepository,
            GeneroRepository generoRepository) {
        this.livroRepository = livroRepository;
        this.autorRepository = autorRepository;
        this.editoraRepository = editoraRepository;
        this.generoRepository = generoRepository;
    }

    @Transactional
    public LivroResponse criar(LivroRequest request) {
        LivroEntity entity = new LivroEntity();
        BeanUtils.copyProperties(request, entity);

        // Validar e associar editora
        if (request.getEditoraId() != null) {
            EditoraEntity editora = editoraRepository.findById(request.getEditoraId())
                .orElseThrow(() -> new EntityNotFoundException("Editora não encontrada com ID: " + request.getEditoraId()));
            entity.setEditora(editora);
        }

        entity = livroRepository.save(entity);

        // Associar autores
        if (request.getAutoresIds() != null && !request.getAutoresIds().isEmpty()) {
            for (UUID autorId : request.getAutoresIds()) {
                AutorEntity autor = autorRepository.findById(autorId)
                    .orElseThrow(() -> new EntityNotFoundException("Autor não encontrado com ID: " + autorId));
                entity.getLivroAutores().add(new LivroAutorEntity(entity, autor));
            }
        }

        // Associar gêneros
        if (request.getGenerosIds() != null && !request.getGenerosIds().isEmpty()) {
            for (UUID generoId : request.getGenerosIds()) {
                GeneroEntity genero = generoRepository.findById(generoId)
                    .orElseThrow(() -> new EntityNotFoundException("Gênero não encontrado com ID: " + generoId));
                entity.getLivroGeneros().add(new LivroGeneroEntity(entity, genero));
            }
        }

        entity = livroRepository.save(entity);
        return toResponse(entity);
    }

    @Transactional(readOnly = true)
    public Page<LivroResponse> listar(Pageable pageable) {
        return livroRepository.findAll(pageable).map(this::toResponse);
    }

    @Transactional(readOnly = true)
    public LivroResponse buscarPorId(UUID id) {
        LivroEntity entity = livroRepository.findByIdWithRelations(id)
            .orElseThrow(() -> new EntityNotFoundException("Livro não encontrado com ID: " + id));
        return toResponse(entity);
    }

    @Transactional
    public void deletar(UUID id) {
        if (!livroRepository.existsById(id)) {
            throw new EntityNotFoundException("Livro não encontrado com ID: " + id);
        }
        livroRepository.deleteById(id);
    }

    private LivroResponse toResponse(LivroEntity entity) {
        LivroResponse response = new LivroResponse();
        BeanUtils.copyProperties(entity, response);

        if (entity.getEditora() != null) {
            EditoraResponse editoraResponse = new EditoraResponse();
            BeanUtils.copyProperties(entity.getEditora(), editoraResponse);
            response.setEditora(editoraResponse);
        }

        List<AutorResponse> autores = entity.getLivroAutores().stream()
            .map(la -> {
                AutorResponse autorResponse = new AutorResponse();
                BeanUtils.copyProperties(la.getAutor(), autorResponse);
                return autorResponse;
            })
            .collect(Collectors.toList());
        response.setAutores(autores);

        List<GeneroResponse> generos = entity.getLivroGeneros().stream()
            .map(lg -> {
                GeneroResponse generoResponse = new GeneroResponse();
                BeanUtils.copyProperties(lg.getGenero(), generoResponse);
                return generoResponse;
            })
            .collect(Collectors.toList());
        response.setGeneros(generos);

        return response;
    }
}

