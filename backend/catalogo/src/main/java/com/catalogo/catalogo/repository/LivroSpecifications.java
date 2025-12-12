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

    public static Specification<LivroEntity> withFilters(String titulo, UUID autorId, UUID generoId) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (titulo != null && !titulo.isEmpty()) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("titulo")), "%" + titulo.toLowerCase() + "%"));
            }

            if (autorId != null) {
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
