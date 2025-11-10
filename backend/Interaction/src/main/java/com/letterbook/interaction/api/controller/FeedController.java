package com.letterbook.interaction.api.controller;

import com.letterbook.interaction.api.dto.ComentarioRequest;
import com.letterbook.interaction.api.dto.ComentarioResponse;
import com.letterbook.interaction.api.dto.FeedItemResponse;
import com.letterbook.interaction.application.service.ComentarioService;
import com.letterbook.interaction.application.service.CurtidaService;
import com.letterbook.interaction.application.service.FeedService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/feed")
public class FeedController {

    private final FeedService feedService;
    private final ComentarioService comentarioService;
    private final CurtidaService curtidaService;

    public FeedController(FeedService feedService,
                         ComentarioService comentarioService,
                         CurtidaService curtidaService) {
        this.feedService = feedService;
        this.comentarioService = comentarioService;
        this.curtidaService = curtidaService;
    }

    @GetMapping
    public ResponseEntity<Page<FeedItemResponse>> buscarFeedSocial(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            Authentication authentication) {
        UUID usuarioId = UUID.fromString(authentication.getName());
        Pageable pageable = PageRequest.of(page, size);
        Page<FeedItemResponse> feed = feedService.buscarFeedSocial(usuarioId, pageable);
        return ResponseEntity.ok(feed);
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<Page<FeedItemResponse>> buscarFeedPorUsuario(
            @PathVariable UUID usuarioId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<FeedItemResponse> feed = feedService.buscarFeedPorUsuario(usuarioId, pageable);
        return ResponseEntity.ok(feed);
    }

    @PostMapping("/comentarios")
    public ResponseEntity<ComentarioResponse> criarComentario(
            @Valid @RequestBody ComentarioRequest request,
            Authentication authentication) {
        UUID usuarioId = UUID.fromString(authentication.getName());
        ComentarioResponse comentario = comentarioService.criarComentario(usuarioId, request);
        return ResponseEntity.ok(comentario);
    }

    @GetMapping("/avaliacoes/{avaliacaoId}/comentarios")
    public ResponseEntity<List<ComentarioResponse>> listarComentariosPorAvaliacao(
            @PathVariable UUID avaliacaoId) {
        List<ComentarioResponse> comentarios = comentarioService.listarComentariosPorAvaliacao(avaliacaoId);
        return ResponseEntity.ok(comentarios);
    }

    @DeleteMapping("/comentarios/{comentarioId}")
    public ResponseEntity<Void> deletarComentario(
            @PathVariable UUID comentarioId,
            Authentication authentication) {
        UUID usuarioId = UUID.fromString(authentication.getName());
        comentarioService.deletarComentario(comentarioId, usuarioId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/avaliacoes/{avaliacaoId}/curtir")
    public ResponseEntity<String> curtirOuDescurtir(
            @PathVariable UUID avaliacaoId,
            Authentication authentication) {
        UUID usuarioId = UUID.fromString(authentication.getName());
        boolean curtido = curtidaService.curtirOuDescurtir(usuarioId, avaliacaoId);
        String mensagem = curtido ? "Avaliação curtida!" : "Curtida removida!";
        return ResponseEntity.ok(mensagem);
    }

    @GetMapping("/avaliacoes/{avaliacaoId}/curtidas")
    public ResponseEntity<Long> contarCurtidas(@PathVariable UUID avaliacaoId) {
        Long totalCurtidas = curtidaService.contarCurtidas(avaliacaoId);
        return ResponseEntity.ok(totalCurtidas);
    }
}
