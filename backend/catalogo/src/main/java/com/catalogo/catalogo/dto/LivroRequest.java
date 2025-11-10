package com.catalogo.catalogo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;
import java.util.UUID;

public class LivroRequest {

    @NotBlank(message = "Título é obrigatório")
    @Size(max = 255, message = "Título deve ter no máximo 255 caracteres")
    private String titulo;

    @Size(max = 13, message = "ISBN deve ter no máximo 13 caracteres")
    private String isbn;

    private String sinopse;

    private String capaUrl;

    private Integer anoPublicacao;

    private UUID editoraId;

    private List<UUID> autoresIds;

    private List<UUID> generosIds;

    public LivroRequest() {
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getSinopse() {
        return sinopse;
    }

    public void setSinopse(String sinopse) {
        this.sinopse = sinopse;
    }

    public String getCapaUrl() {
        return capaUrl;
    }

    public void setCapaUrl(String capaUrl) {
        this.capaUrl = capaUrl;
    }

    public Integer getAnoPublicacao() {
        return anoPublicacao;
    }

    public void setAnoPublicacao(Integer anoPublicacao) {
        this.anoPublicacao = anoPublicacao;
    }

    public UUID getEditoraId() {
        return editoraId;
    }

    public void setEditoraId(UUID editoraId) {
        this.editoraId = editoraId;
    }

    public List<UUID> getAutoresIds() {
        return autoresIds;
    }

    public void setAutoresIds(List<UUID> autoresIds) {
        this.autoresIds = autoresIds;
    }

    public List<UUID> getGenerosIds() {
        return generosIds;
    }

    public void setGenerosIds(List<UUID> generosIds) {
        this.generosIds = generosIds;
    }
}

