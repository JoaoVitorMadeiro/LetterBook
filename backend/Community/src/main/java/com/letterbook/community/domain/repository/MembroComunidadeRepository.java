package com.letterbook.community.domain.repository;

import com.letterbook.community.domain.model.MembroComunidadeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface MembroComunidadeRepository extends JpaRepository<MembroComunidadeEntity, UUID> {
    
    Optional<MembroComunidadeEntity> findByUsuarioIdAndComunidadeId(UUID usuarioId, UUID comunidadeId);
    
    List<MembroComunidadeEntity> findByComunidadeId(UUID comunidadeId);
    
    List<MembroComunidadeEntity> findByUsuarioId(UUID usuarioId);
    
    @Query("SELECT COUNT(m) FROM MembroComunidadeEntity m WHERE m.comunidadeId = :comunidadeId")
    Long countByComunidadeId(@Param("comunidadeId") UUID comunidadeId);
    
    @Query("SELECT m FROM MembroComunidadeEntity m WHERE m.comunidadeId = :comunidadeId ORDER BY m.pontos DESC")
    List<MembroComunidadeEntity> findTopByComunidadeIdOrderByPontosDesc(@Param("comunidadeId") UUID comunidadeId);
    
    boolean existsByUsuarioIdAndComunidadeId(UUID usuarioId, UUID comunidadeId);
}
