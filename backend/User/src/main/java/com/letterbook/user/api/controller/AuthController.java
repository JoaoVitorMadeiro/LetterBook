package com.letterbook.user.api.controller;

import com.letterbook.user.api.dto.CadastroRequest;
import com.letterbook.user.api.dto.LoginRequest;
import com.letterbook.user.api.dto.LoginResponse;
import com.letterbook.user.api.dto.PasswordRecoveryRequest;
import com.letterbook.user.api.dto.ResetPasswordRequest;
import com.letterbook.user.application.usecase.UserUseCase;
import com.letterbook.user.domain.model.UserEntity;
import com.letterbook.user.application.usecase.TokenService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final UserUseCase userUseCase;

    /**
     * RF02 - Cadastro: Registra novo usuário no sistema
     */
    @PostMapping("/register")
    public ResponseEntity<Void> register(@Valid @RequestBody CadastroRequest cadastroRequest) {
        userUseCase.cadastrar(cadastroRequest);
        return ResponseEntity.noContent().build();
    }

    /**
     * RF01 - Login: Autentica usuário com e-mail e senha
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        var authenticationToken = new UsernamePasswordAuthenticationToken(
            loginRequest.email(),
            loginRequest.senha()
        );
        var authentication = authenticationManager.authenticate(authenticationToken);

        var usuario = (UserEntity) authentication.getPrincipal();
        var tokenJWT = tokenService.gerarToken(usuario);

        return ResponseEntity.ok(new LoginResponse(tokenJWT));
    }

    /**
     * RF03 - Recuperação de Senha: Solicita recuperação de senha via e-mail
     */
    @PostMapping("/forgot-password")
    public ResponseEntity<String> solicitarRecuperacaoSenha(@Valid @RequestBody PasswordRecoveryRequest request) {
        userUseCase.solicitarRecuperacaoSenha(request);
        return ResponseEntity.ok("Se o email estiver cadastrado, você receberá instruções para recuperação da senha.");
    }

    /**
     * RF03 - Recuperação de Senha: Redefine senha usando token
     */
    @PostMapping("/reset-password")
    public ResponseEntity<String> redefinirSenha(@Valid @RequestBody ResetPasswordRequest request) {
        userUseCase.redefinirSenha(request);
        return ResponseEntity.ok("Senha redefinida com sucesso.");
    }
}