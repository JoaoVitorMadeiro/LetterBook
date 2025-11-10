package com.letterbook.user.application.usecase;

import com.letterbook.user.api.dto.CadastroRequest;
import com.letterbook.user.api.dto.PasswordRecoveryRequest;
import com.letterbook.user.api.dto.ResetPasswordRequest;
import com.letterbook.user.api.dto.UpdateProfileRequest;
import com.letterbook.user.api.dto.UserProfileResponse;
import com.letterbook.user.api.dto.FollowRequest;
import com.letterbook.user.domain.model.UserEntity;

import java.util.List;
import java.util.UUID;

/**
 * Interface de casos de uso do sistema de usuários
 * RF01 - Login: Implementado via AuthController
 * RF02 - Cadastro
 * RF03 - Recuperação de Senha
 * RF04 - Perfil do Usuário
 */
public interface UserUseCase {
    
    /**
     * RF02 - Cadastro: Registra novo usuário no sistema
     */
    UserEntity cadastrar(CadastroRequest request);
    
    /**
     * RF03 - Recuperação de Senha: Solicita recuperação de senha via e-mail
     */
    void solicitarRecuperacaoSenha(PasswordRecoveryRequest request);
    
    /**
     * RF03 - Recuperação de Senha: Redefine senha usando token
     */
    void redefinirSenha(ResetPasswordRequest request);
    
    /**
     * RF04 - Perfil: Busca perfil do próprio usuário
     */
    UserProfileResponse buscarPerfilProprio(UUID usuarioId);
    
    /**
     * RF04 - Perfil: Busca perfil de outro usuário
     */
    UserProfileResponse buscarPerfilOutroUsuario(UUID usuarioId, UUID usuarioLogadoId);
    
    /**
     * RF04 - Perfil: Atualiza informações do perfil
     */
    UserProfileResponse atualizarPerfil(UUID usuarioId, UpdateProfileRequest request);
    
    /**
     * Funcionalidade de seguir usuário
     */
    void seguirUsuario(UUID seguidorId, FollowRequest request);
    
    /**
     * Funcionalidade de deixar de seguir usuário
     */
    void pararDeSeguir(UUID seguidorId, UUID seguidoId);
    
    /**
     * Lista seguidores de um usuário
     */
    List<UserProfileResponse> listarSeguidores(UUID usuarioId);
    
    /**
     * Lista usuários que um usuário está seguindo
     */
    List<UserProfileResponse> listarSeguindo(UUID usuarioId);
}