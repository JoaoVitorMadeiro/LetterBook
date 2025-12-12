package com.catalogo.catalogo.repository;

import com.catalogo.catalogo.model.LivroEntity;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LivroRepository extends JpaRepository<LivroEntity, UUID>, JpaSpecificationExecutor<LivroEntity> {
    
    @Query("SELECT DISTINCT l FROM LivroEntity l " +
           "LEFT JOIN FETCH l.editora " +
           "LEFT JOIN FETCH l.livroAutores la " +
           "LEFT JOIN FETCH la.autor " +
           "LEFT JOIN FETCH l.livroGeneros lg " +
           "LEFT JOIN FETCH lg.genero")
    List<LivroEntity> findAllWithRelations();

    @Query("SELECT DISTINCT l FROM LivroEntity l " +
           "LEFT JOIN FETCH l.editora " +
           "LEFT JOIN FETCH l.livroAutores la " +
           "LEFT JOIN FETCH la.autor " +
           "LEFT JOIN FETCH l.livroGeneros lg " +
           "LEFT JOIN FETCH lg.genero " +
           "WHERE l.id = :id")
    Optional<LivroEntity> findByIdWithRelations(@Param("id") UUID id);
}

