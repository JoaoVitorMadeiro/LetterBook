package com.catalogo.catalogo.repository;

import com.catalogo.catalogo.model.EditoraEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface EditoraRepository extends JpaRepository<EditoraEntity, UUID> {
    Optional<EditoraEntity> findByNome(String nome);
}

