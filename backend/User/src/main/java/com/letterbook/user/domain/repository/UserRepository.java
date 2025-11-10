package com.letterbook.user.domain.repository;

import com.letterbook.user.domain.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.modulith.NamedInterface;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@NamedInterface
@Repository
public interface UserRepository extends JpaRepository<UserEntity, UUID> {

    Optional<UserEntity> findByEmail(String email);

    UserEntity findByNome(String nome);
    
    Optional<UserEntity> findByTokenRecuperacaoSenha(String token);
}