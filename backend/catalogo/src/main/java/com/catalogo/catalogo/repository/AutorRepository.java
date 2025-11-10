package com.catalogo.catalogo.repository;

import com.catalogo.catalogo.model.AutorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface AutorRepository extends JpaRepository<AutorEntity, UUID> {
    Optional<AutorEntity> findByNomeAndDataNascimento(String nome, java.time.LocalDate dataNascimento);
}

