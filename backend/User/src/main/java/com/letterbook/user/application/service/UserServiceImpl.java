package com.letterbook.user.application.service;

import com.letterbook.user.api.dto.CadastroRequest;
import com.letterbook.user.api.dto.PasswordRecoveryRequest;
import com.letterbook.user.api.dto.ResetPasswordRequest;
import com.letterbook.user.api.dto.UpdateProfileRequest;
import com.letterbook.user.api.dto.UserProfileResponse;
import com.letterbook.user.api.dto.FollowRequest;
import com.letterbook.user.application.usecase.UserUseCase;
import com.letterbook.user.domain.model.UserEntity;
import com.letterbook.user.domain.model.SeguidorEntity;
import com.letterbook.user.domain.repository.UserRepository;
import com.letterbook.user.domain.repository.SeguidorRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

/**
 * RF02 - Cadastro: Implementação do serviço de usuários
 * RF03 - Recuperação de Senha: Implementação da recuperação segura
 * RF04 - Perfil: Implementação do perfil do usuário
 * RNF03 - Segurança: Senhas criptografadas
 */
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserUseCase {

    private final UserRepository userRepository;
    private final SeguidorRepository seguidorRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    /**
     * RF02 - Cadastro: Registra novo usuário com validação e segurança
     * RNF03 - Segurança: Senha criptografada
     */
    @Override
    @Transactional 
    public UserEntity cadastrar(CadastroRequest request) {
        // Valida se email já existe
        userRepository.findByEmail(request.email()).ifPresent(user -> {
            throw new IllegalArgumentException("Email já cadastrado.");
        });

        // Criptografa senha (RNF03)
        String senhaCriptografada = passwordEncoder.encode(request.senha());

        // Cria novo usuário
        UserEntity novoUsuario = new UserEntity();
        novoUsuario.setNome(request.nome());
        novoUsuario.setEmail(request.email());
        novoUsuario.setSenha(senhaCriptografada);

        return userRepository.save(novoUsuario);
    }

    /**
     * RF03 - Recuperação de Senha: Solicita recuperação via e-mail
     * RNF03 - Segurança: Não revela se email existe ou não
     */
    @Override
    @Transactional
    public void solicitarRecuperacaoSenha(PasswordRecoveryRequest request) {
        userRepository.findByEmail(request.email())
            .ifPresentOrElse(
                user -> {
                    // Gera token único para recuperação
                    String token = UUID.randomUUID().toString();
                    
                    // Define expiração para 1 hora
                    OffsetDateTime expiracao = OffsetDateTime.now().plusHours(1);
                    
                    // Salva token no usuário
                    user.setTokenRecuperacaoSenha(token);
                    user.setDataExpiracaoToken(expiracao);
                    userRepository.save(user);
                    
                    // Envia email
                    emailService.enviarEmailRecuperacaoSenha(user.getEmail(), token);
                },
                () -> {
                    // Por segurança (RNF03), não revelamos se o email existe ou não
                }
            );
    }

    /**
     * RF03 - Recuperação de Senha: Redefine senha usando token
     * RNF03 - Segurança: Valida token e expiração
     */
    @Override
    @Transactional
    public void redefinirSenha(ResetPasswordRequest request) {
        UserEntity user = userRepository.findByTokenRecuperacaoSenha(request.token())
            .orElseThrow(() -> new IllegalArgumentException("Token inválido ou expirado."));
        
        // Verifica se o token não expirou
        if (user.getDataExpiracaoToken() == null || user.getDataExpiracaoToken().isBefore(OffsetDateTime.now())) {
            throw new IllegalArgumentException("Token expirado. Solicite uma nova recuperação.");
        }
        
        // Criptografa nova senha (RNF03)
        String novaSenhaCriptografada = passwordEncoder.encode(request.novaSenha());
        
        // Atualiza senha e limpa token
        user.setSenha(novaSenhaCriptografada);
        user.setTokenRecuperacaoSenha(null);
        user.setDataExpiracaoToken(null);
        
        userRepository.save(user);
    }

    /**
     * RF04 - Perfil: Busca perfil do próprio usuário
     */
    @Override
    public UserProfileResponse buscarPerfilProprio(UUID usuarioId) {
        UserEntity user = userRepository.findById(usuarioId)
            .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));
        
        return construirPerfilResponse(user);
    }

    /**
     * RF04 - Perfil: Busca perfil de outro usuário
     */
    @Override
    public UserProfileResponse buscarPerfilOutroUsuario(UUID usuarioId, UUID usuarioLogadoId) {
        UserEntity user = userRepository.findById(usuarioId)
            .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));
        
        return construirPerfilResponse(user);
    }

    /**
     * RF04 - Perfil: Atualiza informações do perfil
     */
    @Override
    @Transactional
    public UserProfileResponse atualizarPerfil(UUID usuarioId, UpdateProfileRequest request) {
        UserEntity user = userRepository.findById(usuarioId)
            .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));

        if (request.nome() != null && !request.nome().isBlank()) {
            user.setNome(request.nome());
        }
        if (request.biografia() != null) {
            user.setBiografia(request.biografia());
        }
        if (request.fotoUrl() != null) {
            user.setFotoUrl(request.fotoUrl());
        }

        user = userRepository.save(user);
        return construirPerfilResponse(user);
    }

    /**
     * Funcionalidade de seguir usuário
     */
    @Override
    @Transactional
    public void seguirUsuario(UUID seguidorId, FollowRequest request) {
        if (seguidorId.equals(request.usuarioId())) {
            throw new IllegalArgumentException("Você não pode seguir a si mesmo.");
        }

        if (!userRepository.existsById(request.usuarioId())) {
            throw new IllegalArgumentException("Usuário não encontrado.");
        }

        seguidorRepository.findBySeguidorIdAndSeguidoId(seguidorId, request.usuarioId())
            .ifPresent(seguidor -> {
                throw new IllegalArgumentException("Você já está seguindo este usuário.");
            });

        SeguidorEntity seguidor = new SeguidorEntity();
        seguidor.setSeguidorId(seguidorId);
        seguidor.setSeguidoId(request.usuarioId());
        
        seguidorRepository.save(seguidor);
    }

    /**
     * Funcionalidade de deixar de seguir usuário
     */
    @Override
    @Transactional
    public void pararDeSeguir(UUID seguidorId, UUID seguidoId) {
        seguidorRepository.deleteBySeguidorIdAndSeguidoId(seguidorId, seguidoId);
    }

    /**
     * Lista seguidores de um usuário
     */
    @Override
    public List<UserProfileResponse> listarSeguidores(UUID usuarioId) {
        List<UUID> seguidorIds = seguidorRepository.findSeguidoresByUsuarioId(usuarioId);
        List<UserEntity> usuarios = userRepository.findAllById(seguidorIds);
        return usuarios.stream()
            .map(this::construirPerfilResponse)
            .toList();
    }

    /**
     * Lista usuários que um usuário está seguindo
     */
    @Override
    public List<UserProfileResponse> listarSeguindo(UUID usuarioId) {
        List<UUID> seguindoIds = seguidorRepository.findSeguindoByUsuarioId(usuarioId);
        List<UserEntity> usuarios = userRepository.findAllById(seguindoIds);
        return usuarios.stream()
            .map(this::construirPerfilResponse)
            .toList();
    }

    /**
     * RF04 - Perfil: Constrói resposta do perfil com todas as informações
     */
    private UserProfileResponse construirPerfilResponse(UserEntity user) {
        Long totalSeguidores = seguidorRepository.countSeguidoresByUsuarioId(user.getId());
        Long totalSeguindo = seguidorRepository.countSeguindoByUsuarioId(user.getId());
        
        // TODO: Implementar contagem de livros lidos e avaliações quando integrar com outros serviços
        return new UserProfileResponse(
            user.getId(),
            user.getNome(),
            user.getEmail(),
            user.getFotoUrl(),
            user.getBiografia(),
            user.getCreatedAt(),
            user.getUpdatedAt(),
            totalSeguidores.intValue(),
            totalSeguindo.intValue(),
            0, // totalLivrosLidos - será implementado quando integrar com catalog-service
            0  // totalAvaliacoes - será implementado quando integrar com interaction-service
        );
    }
}
