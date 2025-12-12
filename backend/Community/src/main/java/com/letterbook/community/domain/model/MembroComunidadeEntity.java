package com.letterbook.community.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(
    name = "membros_comunidade", 
    schema = "social",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"usuario_id", "comunidade_id"})
    }
)
public class MembroComunidadeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "usuario_id", nullable = false)
    private UUID usuarioId;

    @Column(name = "comunidade_id", nullable = false)
    private UUID comunidadeId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoMembro tipo = TipoMembro.MEMBRO;

    @Column(name = "pontos", nullable = false)
    private Integer pontos = 0;

    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = OffsetDateTime.now();
        this.updatedAt = OffsetDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = OffsetDateTime.now();
    }

    public enum TipoMembro {
        MEMBRO, MODERADOR, ADMIN
    }
}
