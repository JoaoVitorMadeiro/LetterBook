package com.letterbook.community.api.controller;

import com.letterbook.community.api.dto.ComunidadeRequest;
import com.letterbook.community.api.dto.ComunidadeResponse;
import com.letterbook.community.api.dto.MembroComunidadeResponse;
import com.letterbook.community.application.service.ComunidadeService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/comunidades")
public class ComunidadeController {

    private final ComunidadeService comunidadeService;

    public ComunidadeController(ComunidadeService comunidadeService) {
        this.comunidadeService = comunidadeService;
    }

    @PostMapping
    public ResponseEntity<ComunidadeResponse> criarComunidade(
            @Valid @RequestBody ComunidadeRequest request,
            Authentication authentication) {
        UUID usuarioId = UUID.fromString(authentication.getName());
        ComunidadeResponse comunidade = comunidadeService.criarComunidade(usuarioId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(comunidade);
    }

    @GetMapping
    public ResponseEntity<Page<ComunidadeResponse>> listarComunidades(
            @RequestParam(required = false) String nome,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            Authentication authentication) {
        UUID usuarioLogadoId = authentication != null ? UUID.fromString(authentication.getName()) : null;
        Pageable pageable = PageRequest.of(page, size);
        Page<ComunidadeResponse> comunidades = comunidadeService.listarComunidades(nome, pageable, usuarioLogadoId);
        return ResponseEntity.ok(comunidades);
    }

    @GetMapping("/{comunidadeId}")
    public ResponseEntity<ComunidadeResponse> buscarComunidade(
            @PathVariable UUID comunidadeId,
            Authentication authentication) {
        UUID usuarioLogadoId = authentication != null ? UUID.fromString(authentication.getName()) : null;
        ComunidadeResponse comunidade = comunidadeService.buscarComunidade(comunidadeId, usuarioLogadoId);
        return ResponseEntity.ok(comunidade);
    }

    @GetMapping("/minhas")
    public ResponseEntity<List<ComunidadeResponse>> listarMinhasComunidades(Authentication authentication) {
        UUID usuarioId = UUID.fromString(authentication.getName());
        List<ComunidadeResponse> comunidades = comunidadeService.listarMinhasComunidades(usuarioId);
        return ResponseEntity.ok(comunidades);
    }

    @PostMapping("/{comunidadeId}/entrar")
    public ResponseEntity<String> entrarComunidade(
            @PathVariable UUID comunidadeId,
            Authentication authentication) {
        UUID usuarioId = UUID.fromString(authentication.getName());
        comunidadeService.entrarComunidade(usuarioId, comunidadeId);
        return ResponseEntity.ok("Você entrou na comunidade!");
    }

    @DeleteMapping("/{comunidadeId}/sair")
    public ResponseEntity<String> sairComunidade(
            @PathVariable UUID comunidadeId,
            Authentication authentication) {
        UUID usuarioId = UUID.fromString(authentication.getName());
        comunidadeService.sairComunidade(usuarioId, comunidadeId);
        return ResponseEntity.ok("Você saiu da comunidade.");
    }

    @GetMapping("/{comunidadeId}/membros")
    public ResponseEntity<List<MembroComunidadeResponse>> listarMembros(@PathVariable UUID comunidadeId) {
        List<MembroComunidadeResponse> membros = comunidadeService.listarMembros(comunidadeId);
        return ResponseEntity.ok(membros);
    }

    @GetMapping("/{comunidadeId}/ranking")
    public ResponseEntity<List<MembroComunidadeResponse>> listarRankingComunidade(@PathVariable UUID comunidadeId) {
        List<MembroComunidadeResponse> ranking = comunidadeService.listarRankingComunidade(comunidadeId);
        return ResponseEntity.ok(ranking);
    }
}
