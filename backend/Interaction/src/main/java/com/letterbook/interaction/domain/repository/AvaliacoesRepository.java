package com.letterbook.interaction.domain.repository;

import com.letterbook.interaction.domain.model.AvaliacoesEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AvaliacoesRepository extends JpaRepository<AvaliacoesEntity, UUID> {
    Page<AvaliacoesEntity> findByLivroId(UUID livroId, Pageable pageable);
    List<AvaliacoesEntity> findByLivroId(UUID livroId);
    List<AvaliacoesEntity> findByUsuarioId(UUID usuarioId);
    Optional<AvaliacoesEntity> findByUsuarioIdAndLivroId(UUID usuarioId, UUID livroId);
}
