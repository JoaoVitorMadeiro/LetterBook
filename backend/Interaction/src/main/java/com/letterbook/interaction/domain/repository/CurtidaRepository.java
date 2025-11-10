package com.letterbook.interaction.domain.repository;

import com.letterbook.interaction.domain.model.CurtidaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CurtidaRepository extends JpaRepository<CurtidaEntity, UUID> {
    Optional<CurtidaEntity> findByUsuarioIdAndAvaliacaoId(UUID usuarioId, UUID avaliacaoId);
    boolean existsByUsuarioIdAndAvaliacaoId(UUID usuarioId, UUID avaliacaoId);
    
    @Query("SELECT COUNT(c) FROM CurtidaEntity c WHERE c.avaliacaoId = :avaliacaoId")
    Long countByAvaliacaoId(@Param("avaliacaoId") UUID avaliacaoId);
    
    List<CurtidaEntity> findByAvaliacaoId(UUID avaliacaoId);
    List<CurtidaEntity> findByUsuarioId(UUID usuarioId);
}
