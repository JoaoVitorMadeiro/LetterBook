package com.catalogo.catalogo.repository;

import com.catalogo.catalogo.model.AutorEntity;
import com.catalogo.catalogo.model.GeneroEntity;
import com.catalogo.catalogo.model.LivroAutorEntity;
import com.catalogo.catalogo.model.LivroEntity;
import com.catalogo.catalogo.model.LivroGeneroEntity;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class LivroSpecifications {

    public static Specification<LivroEntity> withFilters(String search, String titulo, UUID autorId, UUID generoId) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (search != null && !search.isEmpty()) {
                String searchLike = "%" + search.toLowerCase() + "%";
                Predicate titlePredicate = criteriaBuilder.like(criteriaBuilder.lower(root.get("titulo")), searchLike);
                Predicate isbnPredicate = criteriaBuilder.like(criteriaBuilder.lower(root.get("isbn")), searchLike);
                
                // Join for author search (using distinct to avoid duplicates if multiple authors match)
                Join<LivroEntity, LivroAutorEntity> livroAutorSearchJoin = root.join("livroAutores", JoinType.LEFT);
                Join<LivroAutorEntity, AutorEntity> autorSearchJoin = livroAutorSearchJoin.join("autor", JoinType.LEFT);
                Predicate autorPredicate = criteriaBuilder.like(criteriaBuilder.lower(autorSearchJoin.get("nome")), searchLike);

                predicates.add(criteriaBuilder.or(titlePredicate, isbnPredicate, autorPredicate));
                
                // Important: distinct to avoid duplicate rows due to joins
                query.distinct(true);
            }

            if (titulo != null && !titulo.isEmpty()) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("titulo")), "%" + titulo.toLowerCase() + "%"));
            }

            if (autorId != null) {
                // Reuse join if possible or create new. 
                // For simplicity and correctness with criteria API, separate joins are often safer unless managed carefully.
                // However, creating multiple joins to same table might be an issue. 
                // Given the scope, let's just create a new join for filtering by specific ID.
                Join<LivroEntity, LivroAutorEntity> livroAutorJoin = root.join("livroAutores", JoinType.INNER);
                Join<LivroAutorEntity, AutorEntity> autorJoin = livroAutorJoin.join("autor", JoinType.INNER);
                predicates.add(criteriaBuilder.equal(autorJoin.get("id"), autorId));
            }

            if (generoId != null) {
                Join<LivroEntity, LivroGeneroEntity> livroGeneroJoin = root.join("livroGeneros", JoinType.INNER);
                Join<LivroGeneroEntity, GeneroEntity> generoJoin = livroGeneroJoin.join("genero", JoinType.INNER);
                predicates.add(criteriaBuilder.equal(generoJoin.get("id"), generoId));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
