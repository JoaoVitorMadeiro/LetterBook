package com.letterbook.community.domain.repository;

import com.letterbook.community.domain.model.RankingEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface RankingRepository extends JpaRepository<RankingEntity, UUID> {
    
    @Query("SELECT r FROM RankingEntity r WHERE r.tipo = :tipo ORDER BY r.pontos DESC, r.posicao ASC")
    Page<RankingEntity> findByTipoOrderByPontosDesc(@Param("tipo") RankingEntity.TipoRanking tipo, Pageable pageable);
    
    @Query("SELECT r FROM RankingEntity r WHERE r.tipo = :tipo AND r.periodoInicio >= :inicio AND r.periodoFim <= :fim ORDER BY r.pontos DESC")
    List<RankingEntity> findByTipoAndPeriodoOrderByPontosDesc(
        @Param("tipo") RankingEntity.TipoRanking tipo,
        @Param("inicio") OffsetDateTime inicio,
        @Param("fim") OffsetDateTime fim
    );
    
    Optional<RankingEntity> findByUsuarioIdAndTipoAndPeriodoInicioAndPeriodoFim(
        UUID usuarioId, 
        RankingEntity.TipoRanking tipo, 
        OffsetDateTime periodoInicio, 
        OffsetDateTime periodoFim
    );
    
    @Query("SELECT r FROM RankingEntity r WHERE r.usuarioId = :usuarioId ORDER BY r.pontos DESC")
    List<RankingEntity> findByUsuarioIdOrderByPontosDesc(@Param("usuarioId") UUID usuarioId);
}
