package com.letterbook.interaction.api.controller;

import com.letterbook.interaction.api.dto.ListaRequest;
import com.letterbook.interaction.api.dto.ListaResponse;
import com.letterbook.interaction.application.service.ListaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/listas")
public class ListaController {

    private final ListaService listaService;

    public ListaController(ListaService listaService) {
        this.listaService = listaService;
    }

    @PostMapping
    public ResponseEntity<ListaResponse> criar(
            @Valid @RequestBody ListaRequest request,
            Authentication authentication) {
        // Fallback for unauthenticated access in dev/test if needed, or handle exception
        String userIdStr = authentication != null ? authentication.getName() : "00000000-0000-0000-0000-000000000000"; 
        // In real auth, authentication should be present. Assuming 'uuid' is the principal name.
        UUID usuarioId = UUID.fromString(userIdStr);
        
        ListaResponse response = listaService.criarLista(usuarioId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<ListaResponse>> listarMinhasListas(Authentication authentication) {
         String userIdStr = authentication != null ? authentication.getName() : "00000000-0000-0000-0000-000000000000";
        UUID usuarioId = UUID.fromString(userIdStr);
        List<ListaResponse> response = listaService.listarListasPorUsuario(usuarioId);
        return ResponseEntity.ok(response);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ListaResponse> atualizar(
            @PathVariable UUID id,
            @Valid @RequestBody ListaRequest request,
            Authentication authentication) {
        String userIdStr = authentication != null ? authentication.getName() : "00000000-0000-0000-0000-000000000000";
        UUID usuarioId = UUID.fromString(userIdStr);
        ListaResponse response = listaService.atualizarLista(usuarioId, id, request);
        return ResponseEntity.ok(response);
    }
}
