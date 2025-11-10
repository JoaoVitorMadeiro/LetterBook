package com.letterbook.user.domain.repository;

import com.letterbook.user.domain.model.SeguidorEntity;
import com.letterbook.user.domain.model.SeguidorId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SeguidorRepository extends JpaRepository<SeguidorEntity, SeguidorId> {

    Optional<SeguidorEntity> findBySeguidorIdAndSeguidoId(UUID seguidorId, UUID seguidoId);

    @Query("SELECT COUNT(s) FROM SeguidorEntity s WHERE s.seguidoId = :usuarioId")
    Long countSeguidoresByUsuarioId(@Param("usuarioId") UUID usuarioId);

    @Query("SELECT COUNT(s) FROM SeguidorEntity s WHERE s.seguidorId = :usuarioId")
    Long countSeguindoByUsuarioId(@Param("usuarioId") UUID usuarioId);

    @Query("SELECT s.seguidoId FROM SeguidorEntity s WHERE s.seguidorId = :usuarioId")
    List<UUID> findSeguindoByUsuarioId(@Param("usuarioId") UUID usuarioId);

    @Query("SELECT s.seguidorId FROM SeguidorEntity s WHERE s.seguidoId = :usuarioId")
    List<UUID> findSeguidoresByUsuarioId(@Param("usuarioId") UUID usuarioId);

    void deleteBySeguidorIdAndSeguidoId(UUID seguidorId, UUID seguidoId);
}
