package com.letterbook.user.api.controller;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.letterbook.user.api.dto.CadastroRequest;
import com.letterbook.user.api.dto.UpdateProfileRequest;
import com.letterbook.user.api.dto.UserProfileResponse;
import com.letterbook.user.api.dto.FollowRequest;
import com.letterbook.user.application.usecase.UserUseCase;
import com.letterbook.user.domain.model.UserEntity;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/api/v1/usuarios")
@RequiredArgsConstructor
public class UserController {

    private final UserUseCase userUseCase;

    /**
     * RF02 - Cadastro: Registra novo usuário no sistema
     */
    @PostMapping("/cadastro")
    public ResponseEntity<String> cadastrar(@Valid @RequestBody CadastroRequest request) {
        userUseCase.cadastrar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body("Usuário cadastrado com sucesso.");
    }

    /**
     * RF04 - Perfil: Busca perfil do usuário autenticado
     */
    @GetMapping("/me/profile")
    public ResponseEntity<UserProfileResponse> buscarMeuPerfil(Authentication authentication) {
        UserEntity usuario = (UserEntity) authentication.getPrincipal();
        UserProfileResponse perfil = userUseCase.buscarPerfilProprio(usuario.getId());
        return ResponseEntity.ok(perfil);
    }

    /**
     * RF04 - Perfil: Busca perfil de outro usuário
     */
    @GetMapping("/{usuarioId}/profile")
    public ResponseEntity<UserProfileResponse> buscarPerfilOutroUsuario(
            @PathVariable UUID usuarioId, 
            Authentication authentication) {
        UserEntity usuarioLogado = (UserEntity) authentication.getPrincipal();
        UserProfileResponse perfil = userUseCase.buscarPerfilOutroUsuario(usuarioId, usuarioLogado.getId());
        return ResponseEntity.ok(perfil);
    }

    /**
     * RF04 - Perfil: Atualiza informações do perfil do usuário autenticado
     */
    @PutMapping("/me/profile")
    public ResponseEntity<UserProfileResponse> atualizarPerfil(
            @Valid @RequestBody UpdateProfileRequest request,
            Authentication authentication) {
        UserEntity usuario = (UserEntity) authentication.getPrincipal();
        UserProfileResponse perfilAtualizado = userUseCase.atualizarPerfil(usuario.getId(), request);
        return ResponseEntity.ok(perfilAtualizado);
    }

    @PostMapping("/follow")
    public ResponseEntity<String> seguirUsuario(
            @Valid @RequestBody FollowRequest request,
            Authentication authentication) {
        UserEntity seguidor = (UserEntity) authentication.getPrincipal();
        userUseCase.seguirUsuario(seguidor.getId(), request);
        return ResponseEntity.ok("Usuário seguido com sucesso.");
    }

    @DeleteMapping("/{usuarioId}/unfollow")
    public ResponseEntity<String> pararDeSeguir(
            @PathVariable UUID usuarioId,
            Authentication authentication) {
        UserEntity seguidor = (UserEntity) authentication.getPrincipal();
        userUseCase.pararDeSeguir(seguidor.getId(), usuarioId);
        return ResponseEntity.ok("Deixou de seguir o usuário.");
    }

    @GetMapping("/me/followers")
    public ResponseEntity<List<UserProfileResponse>> listarMeusSeguidores(Authentication authentication) {
        UserEntity usuario = (UserEntity) authentication.getPrincipal();
        List<UserProfileResponse> seguidores = userUseCase.listarSeguidores(usuario.getId());
        return ResponseEntity.ok(seguidores);
    }

    @GetMapping("/me/following")
    public ResponseEntity<List<UserProfileResponse>> listarSeguindo(Authentication authentication) {
        UserEntity usuario = (UserEntity) authentication.getPrincipal();
        List<UserProfileResponse> seguindo = userUseCase.listarSeguindo(usuario.getId());
        return ResponseEntity.ok(seguindo);
    }

    @GetMapping("/{usuarioId}/followers")
    public ResponseEntity<List<UserProfileResponse>> listarSeguidoresDoUsuario(@PathVariable UUID usuarioId) {
        List<UserProfileResponse> seguidores = userUseCase.listarSeguidores(usuarioId);
        return ResponseEntity.ok(seguidores);
    }

    @GetMapping("/{usuarioId}/following")
    public ResponseEntity<List<UserProfileResponse>> listarSeguindoDoUsuario(@PathVariable UUID usuarioId) {
        List<UserProfileResponse> seguindo = userUseCase.listarSeguindo(usuarioId);
        return ResponseEntity.ok(seguindo);
    }
}