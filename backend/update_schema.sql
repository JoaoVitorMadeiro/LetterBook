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
