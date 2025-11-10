package com.catalogo.catalogo.repository;

import com.catalogo.catalogo.model.GeneroEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface GeneroRepository extends JpaRepository<GeneroEntity, UUID> {
    Optional<GeneroEntity> findByNome(String nome);
}

