package com.letterbook.interaction.domain.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "listas", schema = "social")
@Getter
@Setter
public class ListaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "usuario_id", nullable = false)
    private UUID usuarioId;

    @Column(nullable = false)
    private String nome;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(nullable = false)
    private String tipo; // PUBLIC, PRIVATE, UNLISTED

    private String tags;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
        name = "lista_livros", 
        schema = "social", 
        joinColumns = @JoinColumn(name = "lista_id")
    )
    @Column(name = "livro_id")
    private Set<UUID> livrosIds = new HashSet<>();

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
