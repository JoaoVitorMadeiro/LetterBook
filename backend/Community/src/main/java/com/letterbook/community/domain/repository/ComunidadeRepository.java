package com.letterbook.community.domain.repository;

import com.letterbook.community.domain.model.ComunidadeEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ComunidadeRepository extends JpaRepository<ComunidadeEntity, UUID> {
    
    @Query("SELECT c FROM ComunidadeEntity c WHERE c.nome LIKE %:nome%")
    Page<ComunidadeEntity> findByNomeContaining(@Param("nome") String nome, Pageable pageable);
    
    @Query("SELECT c FROM ComunidadeEntity c JOIN MembroComunidadeEntity m ON c.id = m.comunidadeId WHERE m.usuarioId = :usuarioId")
    List<ComunidadeEntity> findByUsuarioId(@Param("usuarioId") UUID usuarioId);
    
    Optional<ComunidadeEntity> findByNome(String nome);
}
