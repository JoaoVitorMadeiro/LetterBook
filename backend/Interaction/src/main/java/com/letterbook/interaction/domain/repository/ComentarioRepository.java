package com.letterbook.interaction.domain.repository;

import com.letterbook.interaction.domain.model.ComentarioEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ComentarioRepository extends JpaRepository<ComentarioEntity, UUID> {
    List<ComentarioEntity> findByAvaliacaoId(UUID avaliacaoId);
    Page<ComentarioEntity> findByAvaliacaoId(UUID avaliacaoId, Pageable pageable);
    List<ComentarioEntity> findByUsuarioId(UUID usuarioId);
}
