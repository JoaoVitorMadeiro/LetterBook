package com.letterbook.interaction.api.controller;

import com.letterbook.interaction.api.dto.AvaliacaoRequest;
import com.letterbook.interaction.api.dto.AvaliacaoResponse;
import com.letterbook.interaction.api.dto.UpdateAvaliacaoRequest;
import com.letterbook.interaction.application.service.AvaliacaoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/avaliacoes")
public class AvaliacaoController {

    private final AvaliacaoService avaliacaoService;

    public AvaliacaoController(AvaliacaoService avaliacaoService) {
        this.avaliacaoService = avaliacaoService;
    }

    @PostMapping
    public ResponseEntity<AvaliacaoResponse> criarAvaliacao(
            @Valid @RequestBody AvaliacaoRequest request,
            Authentication authentication) {
        UUID usuarioId = UUID.fromString(authentication.getName());
        AvaliacaoResponse avaliacao = avaliacaoService.criarAvaliacao(usuarioId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(avaliacao);
    }

    @GetMapping("/livro/{livroId}")
    public ResponseEntity<List<AvaliacaoResponse>> listarAvaliacoesPorLivro(@PathVariable UUID livroId) {
        List<AvaliacaoResponse> avaliacoes = avaliacaoService.listarAvaliacoesPorLivro(livroId);
        return ResponseEntity.ok(avaliacoes);
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<AvaliacaoResponse>> listarAvaliacoesPorUsuario(@PathVariable UUID usuarioId) {
        List<AvaliacaoResponse> avaliacoes = avaliacaoService.listarAvaliacoesPorUsuario(usuarioId);
        return ResponseEntity.ok(avaliacoes);
    }

    @GetMapping("/me")
    public ResponseEntity<List<AvaliacaoResponse>> listarMinhasAvaliacoes(Authentication authentication) {
        UUID usuarioId = UUID.fromString(authentication.getName());
        List<AvaliacaoResponse> avaliacoes = avaliacaoService.listarAvaliacoesPorUsuario(usuarioId);
        return ResponseEntity.ok(avaliacoes);
    }

    @GetMapping("/livro/{livroId}/usuario/{usuarioId}")
    public ResponseEntity<AvaliacaoResponse> buscarAvaliacao(
            @PathVariable UUID livroId,
            @PathVariable UUID usuarioId) {
        Optional<AvaliacaoResponse> avaliacao = avaliacaoService.buscarAvaliacao(usuarioId, livroId);
        return avaliacao.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/me/livro/{livroId}")
    public ResponseEntity<AvaliacaoResponse> buscarMinhaAvaliacao(
            @PathVariable UUID livroId,
            Authentication authentication) {
        UUID usuarioId = UUID.fromString(authentication.getName());
        Optional<AvaliacaoResponse> avaliacao = avaliacaoService.buscarAvaliacao(usuarioId, livroId);
        return avaliacao.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/livro/{livroId}")
    public ResponseEntity<AvaliacaoResponse> atualizarAvaliacao(
            @PathVariable UUID livroId,
            @Valid @RequestBody UpdateAvaliacaoRequest request,
            Authentication authentication) {
        UUID usuarioId = UUID.fromString(authentication.getName());
        AvaliacaoResponse avaliacao = avaliacaoService.atualizarAvaliacao(usuarioId, livroId, request);
        return ResponseEntity.ok(avaliacao);
    }

    @DeleteMapping("/livro/{livroId}")
    public ResponseEntity<Void> deletarAvaliacao(
            @PathVariable UUID livroId,
            Authentication authentication) {
        UUID usuarioId = UUID.fromString(authentication.getName());
        avaliacaoService.deletarAvaliacao(usuarioId, livroId);
        return ResponseEntity.noContent().build();
    }
}
