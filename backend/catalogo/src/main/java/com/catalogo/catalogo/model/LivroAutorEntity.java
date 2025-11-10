package com.catalogo.catalogo.model;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "livro_autores", schema = "core")
@IdClass(LivroAutorEntity.LivroAutorId.class)
public class LivroAutorEntity {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "livro_id", nullable = false)
    private LivroEntity livro;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "autor_id", nullable = false)
    private AutorEntity autor;

    public LivroAutorEntity() {
    }

    public LivroAutorEntity(LivroEntity livro, AutorEntity autor) {
        this.livro = livro;
        this.autor = autor;
    }

    public LivroEntity getLivro() {
        return livro;
    }

    public void setLivro(LivroEntity livro) {
        this.livro = livro;
    }

    public AutorEntity getAutor() {
        return autor;
    }

    public void setAutor(AutorEntity autor) {
        this.autor = autor;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LivroAutorEntity that = (LivroAutorEntity) o;
        return Objects.equals(livro, that.livro) && Objects.equals(autor, that.autor);
    }

    @Override
    public int hashCode() {
        return Objects.hash(livro, autor);
    }

    public static class LivroAutorId implements Serializable {
        private UUID livro;
        private UUID autor;

        public LivroAutorId() {
        }

        public LivroAutorId(UUID livro, UUID autor) {
            this.livro = livro;
            this.autor = autor;
        }

        public UUID getLivro() {
            return livro;
        }

        public void setLivro(UUID livro) {
            this.livro = livro;
        }

        public UUID getAutor() {
            return autor;
        }

        public void setAutor(UUID autor) {
            this.autor = autor;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            LivroAutorId that = (LivroAutorId) o;
            return Objects.equals(livro, that.livro) && Objects.equals(autor, that.autor);
        }

        @Override
        public int hashCode() {
            return Objects.hash(livro, autor);
        }
    }
}

