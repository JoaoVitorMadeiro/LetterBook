package com.letterbook.interaction.domain.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(
        name = "avaliacoes",
        schema = "social",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"usuario_id", "livro_id"})
        }
)
public class AvaliacoesEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotNull
    @Column(name = "usuario_id", nullable = false)
    private UUID usuarioId;

    @NotNull
    @Column(name = "livro_id", nullable = false)
    private UUID livroId;

    @NotNull
    @Min(1)
    @Max(5)
    @Column(nullable = false)
    private Integer nota;

    @Column(columnDefinition = "TEXT")
    private String resenha;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    // Hook do JPA para preencher createdAt antes de persistir pela primeira vez
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    // Hook do JPA para atualizar updatedAt sempre que a entidade for atualizada
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}