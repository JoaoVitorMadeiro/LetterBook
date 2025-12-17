package com.catalogo.catalogo.controller;

import com.catalogo.catalogo.dto.LivroRequest;
import com.catalogo.catalogo.dto.LivroResponse;
import com.catalogo.catalogo.service.LivroService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/livros")
public class LivroController {

    private final LivroService livroService;

    public LivroController(LivroService livroService) {
        this.livroService = livroService;
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<LivroResponse> criar(@Valid @RequestBody LivroRequest request) {
        LivroResponse response = livroService.criar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Page<LivroResponse>> listar(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "titulo") String sortBy,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String titulo,
            @RequestParam(required = false) UUID autorId,
            @RequestParam(required = false) UUID generoId) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        Page<LivroResponse> response = livroService.listar(pageable, search, titulo, autorId, generoId);
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<LivroResponse> buscarPorId(@PathVariable UUID id) {
        LivroResponse response = livroService.buscarPorId(id);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deletar(@PathVariable UUID id) {
        livroService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}

