package com.letterbook.interaction.domain.repository;

import com.letterbook.interaction.domain.model.ListaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ListaRepository extends JpaRepository<ListaEntity, UUID> {
    List<ListaEntity> findByUsuarioId(UUID usuarioId);
}
