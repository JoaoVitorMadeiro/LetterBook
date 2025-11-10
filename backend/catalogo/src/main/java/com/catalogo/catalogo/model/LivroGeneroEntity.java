package com.catalogo.catalogo.model;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "livro_generos", schema = "core")
@IdClass(LivroGeneroEntity.LivroGeneroId.class)
public class LivroGeneroEntity {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "livro_id", nullable = false)
    private LivroEntity livro;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "genero_id", nullable = false)
    private GeneroEntity genero;

    public LivroGeneroEntity() {
    }

    public LivroGeneroEntity(LivroEntity livro, GeneroEntity genero) {
        this.livro = livro;
        this.genero = genero;
    }

    public LivroEntity getLivro() {
        return livro;
    }

    public void setLivro(LivroEntity livro) {
        this.livro = livro;
    }

    public GeneroEntity getGenero() {
        return genero;
    }

    public void setGenero(GeneroEntity genero) {
        this.genero = genero;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LivroGeneroEntity that = (LivroGeneroEntity) o;
        return Objects.equals(livro, that.livro) && Objects.equals(genero, that.genero);
    }

    @Override
    public int hashCode() {
        return Objects.hash(livro, genero);
    }

    public static class LivroGeneroId implements Serializable {
        private UUID livro;
        private UUID genero;

        public LivroGeneroId() {
        }

        public LivroGeneroId(UUID livro, UUID genero) {
            this.livro = livro;
            this.genero = genero;
        }

        public UUID getLivro() {
            return livro;
        }

        public void setLivro(UUID livro) {
            this.livro = livro;
        }

        public UUID getGenero() {
            return genero;
        }

        public void setGenero(UUID genero) {
            this.genero = genero;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            LivroGeneroId that = (LivroGeneroId) o;
            return Objects.equals(livro, that.livro) && Objects.equals(genero, that.genero);
        }

        @Override
        public int hashCode() {
            return Objects.hash(livro, genero);
        }
    }
}

