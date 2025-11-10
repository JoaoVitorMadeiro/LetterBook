package com.letterbook.user.domain.model;

// Imports JPA removidos - classe não é mais uma entidade
// import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
// @Entity - Removido: Entidade não utilizada no momento. O perfil está sendo gerenciado diretamente via UserEntity.
// @Table(name = "user_profiles", schema = "social")
/**
 * Classe não utilizada no momento.
 * O sistema de perfil está sendo gerenciado diretamente através da entidade UserEntity.
 * Esta classe pode ser removida ou reativada no futuro se necessário.
 */
public class UserProfileEntity {

    // Anotações JPA removidas - classe não é mais uma entidade
    // @Id
    // @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    // @OneToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "usuario_id", nullable = false, unique = true)
    private UserEntity usuario;

    // @Column(name = "foto_url")
    private String fotoUrl;

    // @Column(columnDefinition = "TEXT")
    private String biografia;

    // @Column(name = "data_nascimento")
    private OffsetDateTime dataNascimento;

    // @Column(name = "localizacao", length = 100)
    private String localizacao;

    // @Column(name = "website", length = 255)
    private String website;

    // @Column(name = "total_seguidores", nullable = false)
    private Integer totalSeguidores = 0;

    // @Column(name = "total_seguindo", nullable = false)
    private Integer totalSeguindo = 0;

    // @Column(name = "total_livros_lidos", nullable = false)
    private Integer totalLivrosLidos = 0;

    // @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;

    // @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    // @PrePersist
    protected void onCreate() {
        this.createdAt = OffsetDateTime.now();
        this.updatedAt = OffsetDateTime.now();
    }

    // @PreUpdate
    protected void onUpdate() {
        this.updatedAt = OffsetDateTime.now();
    }
}
