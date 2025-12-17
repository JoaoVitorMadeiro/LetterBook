package com.catalogo.catalogo.repository;

import com.catalogo.catalogo.model.LivroEntity;
import org.junit.jupiter.api.Test;
import org.springframework.data.jpa.domain.Specification;

import static org.junit.jupiter.api.Assertions.assertNotNull;

class LivroSpecificationsTest {

    @Test
    void testWithFilters() {
        // Just verify that the specification is created without errors. 
        // A full test would require an H2 database context or mocking CriteriaBuilder.
        // For this environment, ensuring it constructs is a basic sanity check.
        Specification<LivroEntity> spec = LivroSpecifications.withFilters("Harry Potter", null, null, null);
        assertNotNull(spec);
    }
}
