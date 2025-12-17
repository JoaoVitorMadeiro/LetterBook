-- SQL Script for LetterBook Database

-- -----------------------------------------------------
-- 1. Database and User Creation
-- -----------------------------------------------------

-- Drop existing database and user if they exist
-- DROP DATABASE IF EXISTS letterbook_db;
-- DROP USER IF EXISTS letterbook_user;

-- Create a dedicated user for the application with a strong password.
-- Replace 'your_strong_password' with a real, strong password.
-- CREATE USER letterbook_user WITH PASSWORD 'your_strong_password';

-- Create the database owned by the new user.
-- CREATE DATABASE letterbook_db OWNER letterbook_user;

-- Grant all privileges on the database to the new user.
-- GRANT ALL PRIVILEGES ON DATABASE letterbook_db TO letterbook_user;


-- -----------------------------------------------------
-- 2. Schema Creation
-- -----------------------------------------------------

-- Connect to the letterbook_db before running the rest of the script.
-- \c letterbook_db

-- Create schemas to organize the tables.
CREATE SCHEMA IF NOT EXISTS core;
CREATE SCHEMA IF NOT EXISTS social;

-- Set the owner of the schemas to the application user.
-- ALTER SCHEMA core OWNER TO letterbook_user;
-- ALTER SCHEMA social OWNER TO letterbook_user;

-- -----------------------------------------------------
-- 3. Table Creation in 'core' Schema
-- -----------------------------------------------------

-- Table for users
CREATE TABLE IF NOT EXISTS core.usuarios (
    id UUID PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    foto_url VARCHAR(255),
    biografia TEXT,
    token_recuperacao_senha VARCHAR(255),
    data_expiracao_token TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL
);

-- Table for authors
CREATE TABLE IF NOT EXISTS core.autores (
    id UUID PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    data_nascimento DATE,
    biografia TEXT,
    UNIQUE (nome, data_nascimento)
);

-- Table for publishers
CREATE TABLE IF NOT EXISTS core.editoras (
    id UUID PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE
);

-- Table for genres
CREATE TABLE IF NOT EXISTS core.generos (
    id UUID PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE
);

-- Table for books
CREATE TABLE IF NOT EXISTS core.livros (
    id UUID PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    isbn VARCHAR(13) UNIQUE,
    sinopse TEXT,
    capa_url VARCHAR(255),
    ano_publicacao INTEGER,
    editora_id UUID,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (editora_id) REFERENCES core.editoras(id)
);

-- Join table for books and authors
CREATE TABLE IF NOT EXISTS core.livro_autores (
    livro_id UUID NOT NULL,
    autor_id UUID NOT NULL,
    PRIMARY KEY (livro_id, autor_id),
    FOREIGN KEY (livro_id) REFERENCES core.livros(id) ON DELETE CASCADE,
    FOREIGN KEY (autor_id) REFERENCES core.autores(id) ON DELETE CASCADE
);

-- Join table for books and genres
CREATE TABLE IF NOT EXISTS core.livro_generos (
    livro_id UUID NOT NULL,
    genero_id UUID NOT NULL,
    PRIMARY KEY (livro_id, genero_id),
    FOREIGN KEY (livro_id) REFERENCES core.livros(id) ON DELETE CASCADE,
    FOREIGN KEY (genero_id) REFERENCES core.generos(id) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- 4. Table Creation in 'social' Schema
-- -----------------------------------------------------

-- Table for follows
CREATE TABLE IF NOT EXISTS social.follows (
    id UUID PRIMARY KEY,
    seguidor_id UUID NOT NULL,
    seguido_id UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    UNIQUE (seguidor_id, seguido_id),
    FOREIGN KEY (seguidor_id) REFERENCES core.usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (seguido_id) REFERENCES core.usuarios(id) ON DELETE CASCADE
);

-- Table for followers (alternative to follows)
CREATE TABLE IF NOT EXISTS social.seguidores (
    seguidor_id UUID NOT NULL,
    seguido_id UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    PRIMARY KEY (seguidor_id, seguido_id),
    FOREIGN KEY (seguidor_id) REFERENCES core.usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (seguido_id) REFERENCES core.usuarios(id) ON DELETE CASCADE
);

-- Table for communities
CREATE TABLE IF NOT EXISTS social.comunidades (
    id UUID PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    imagem_url VARCHAR(255),
    criador_id UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (criador_id) REFERENCES core.usuarios(id)
);

-- Table for community members
CREATE TABLE IF NOT EXISTS social.membros_comunidade (
    id UUID PRIMARY KEY,
    usuario_id UUID NOT NULL,
    comunidade_id UUID NOT NULL,
    tipo VARCHAR(20) NOT NULL DEFAULT 'MEMBRO',
    pontos INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL,
    UNIQUE (usuario_id, comunidade_id),
    FOREIGN KEY (usuario_id) REFERENCES core.usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (comunidade_id) REFERENCES social.comunidades(id) ON DELETE CASCADE,
    CHECK (tipo IN ('MEMBRO', 'MODERADOR', 'ADMIN'))
);

-- Table for rankings
CREATE TABLE IF NOT EXISTS social.rankings (
    id UUID PRIMARY KEY,
    usuario_id UUID NOT NULL,
    tipo VARCHAR(20) NOT NULL,
    pontos INTEGER NOT NULL,
    posicao INTEGER NOT NULL,
    periodo_inicio TIMESTAMPTZ NOT NULL,
.
    periodo_fim TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES core.usuarios(id) ON DELETE CASCADE,
    CHECK (tipo IN ('GERAL', 'COMUNIDADE', 'MENSAL', 'ANUAL'))
);

-- Table for reviews/evaluations
CREATE TABLE IF NOT EXISTS social.avaliacoes (
    id UUID PRIMARY KEY,
    usuario_id UUID NOT NULL,
    livro_id UUID NOT NULL,
    nota INTEGER NOT NULL,
    resenha TEXT,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL,
    UNIQUE (usuario_id, livro_id),
    FOREIGN KEY (usuario_id) REFERENCES core.usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (livro_id) REFERENCES core.livros(id) ON DELETE CASCADE,
    CHECK (nota >= 1 AND nota <= 5)
);

-- Table for comments on reviews
CREATE TABLE IF NOT EXISTS social.comentarios (
    id UUID PRIMARY KEY,
    usuario_id UUID NOT NULL,
    avaliacao_id UUID NOT NULL,
    texto TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES core.usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (avaliacao_id) REFERENCES social.avaliacoes(id) ON DELETE CASCADE
);

-- Table for likes on reviews
CREATE TABLE IF NOT EXISTS social.curtidas (
    id UUID PRIMARY KEY,
    usuario_id UUID NOT NULL,
    avaliacao_id UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    UNIQUE (usuario_id, avaliacao_id),
    FOREIGN KEY (usuario_id) REFERENCES core.usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (avaliacao_id) REFERENCES social.avaliacoes(id) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- 5. Indexes for Performance
-- -----------------------------------------------------

-- Index on email for faster login
CREATE INDEX IF NOT EXISTS idx_usuarios_email ON core.usuarios(email);

-- Index on foreign keys for better join performance
CREATE INDEX IF NOT EXISTS idx_livros_editora_id ON core.livros(editora_id);
CREATE INDEX IF NOT EXISTS idx_livro_autores_livro_id ON core.livro_autores(livro_id);
CREATE INDEX IF NOT EXISTS idx_livro_autores_autor_id ON core.livro_autores(autor_id);
CREATE INDEX IF NOT EXISTS idx_livro_generos_livro_id ON core.livro_generos(livro_id);
CREATE INDEX IF NOT EXISTS idx_livro_generos_genero_id ON core.livro_generos(genero_id);
CREATE INDEX IF NOT EXISTS idx_follows_seguidor_id ON social.follows(seguidor_id);
CREATE INDEX IF NOT EXISTS idx_follows_seguido_id ON social.follows(seguido_id);
CREATE INDEX IF NOT EXISTS idx_membros_comunidade_usuario_id ON social.membros_comunidade(usuario_id);
CREATE INDEX IF NOT EXISTS idx_membros_comunidade_comunidade_id ON social.membros_comunidade(comunidade_id);
CREATE INDEX IF NOT EXISTS idx_avaliacoes_usuario_id ON social.avaliacoes(usuario_id);
CREATE INDEX IF NOT EXISTS idx_avaliacoes_livro_id ON social.avaliacoes(livro_id);
CREATE INDEX IF NOT EXISTS idx_comentarios_usuario_id ON social.comentarios(usuario_id);
CREATE INDEX IF NOT EXISTS idx_comentarios_avaliacao_id ON social.comentarios(avaliacao_id);
CREATE INDEX IF NOT EXISTS idx_curtidas_usuario_id ON social.curtidas(usuario_id);
CREATE INDEX IF NOT EXISTS idx_curtidas_avaliacao_id ON social.curtidas(avaliacao_id);

-- -----------------------------------------------------
-- 6. Granting Privileges
-- -----------------------------------------------------

-- Grant usage on schemas to the application user.
-- GRANT USAGE ON SCHEMA core TO letterbook_user;
-- GRANT USAGE ON SCHEMA social TO letterbook_user;

-- Grant permissions on tables to the application user.
-- GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA core TO letterbook_user;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA social TO letterbook_user;

-- Grant usage on sequences to the application user (if any).
-- GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA core TO letterbook_user;
-- GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA social TO letterbook_user;
-- Create table for user lists
CREATE TABLE IF NOT EXISTS social.listas (
    id UUID PRIMARY KEY,
    usuario_id UUID NOT NULL,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    tipo VARCHAR(20) NOT NULL DEFAULT 'PUBLIC', -- PUBLIC, PRIVATE, UNLISTED
    tags VARCHAR(255), -- Comma separated tags or JSON
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES core.usuarios(id) ON DELETE CASCADE,
    CHECK (tipo IN ('PUBLIC', 'PRIVATE', 'UNLISTED'))
);

-- Join table for lists and books
CREATE TABLE IF NOT EXISTS social.lista_livros (
    lista_id UUID NOT NULL,
    livro_id UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (lista_id, livro_id),
    FOREIGN KEY (lista_id) REFERENCES social.listas(id) ON DELETE CASCADE,
    FOREIGN KEY (livro_id) REFERENCES core.livros(id) ON DELETE CASCADE
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_listas_usuario_id ON social.listas(usuario_id);
CREATE INDEX IF NOT EXISTS idx_lista_livros_lista_id ON social.lista_livros(lista_id);
CREATE INDEX IF NOT EXISTS idx_lista_livros_livro_id ON social.lista_livros(livro_id);
