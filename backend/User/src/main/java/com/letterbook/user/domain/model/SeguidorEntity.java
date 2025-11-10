package com.letterbook.user.domain.model;

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
    name = "seguidores", 
    schema = "social"
)
@IdClass(SeguidorId.class)
public class SeguidorEntity {

    @Id
    @Column(name = "seguidor_id", nullable = false)
    private UUID seguidorId;

    @Id
    @Column(name = "seguido_id", nullable = false)
    private UUID seguidoId;

    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = OffsetDateTime.now();
    }
    
    // Métodos setters adicionados manualmente devido a problemas com Lombok
    public void setSeguidorId(UUID seguidorId) {
        this.seguidorId = seguidorId;
    }
    
    public void setSeguidoId(UUID seguidoId) {
        this.seguidoId = seguidoId;
    }
}
