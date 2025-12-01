-- Alinha social.follows com as entidades Java (UUID e nomes em pt-BR)

-- 1) Remove coluna errada BIGINT se existir
ALTER TABLE social.follows DROP COLUMN IF EXISTS seguido_id CASCADE;

-- 2) Renomeia colunas de inglês para pt-BR se existirem
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'social' AND table_name = 'follows' AND column_name = 'follower_id'
    ) THEN
        EXECUTE 'ALTER TABLE social.follows RENAME COLUMN follower_id TO seguidor_id';
    END IF;

    IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'social' AND table_name = 'follows' AND column_name = 'followed_id'
    ) THEN
        EXECUTE 'ALTER TABLE social.follows RENAME COLUMN followed_id TO seguido_id';
    END IF;
END$$;

-- 3) Garante tipos UUID (no-op se já forem UUID)
ALTER TABLE social.follows ALTER COLUMN seguidor_id TYPE UUID USING seguidor_id::uuid;
ALTER TABLE social.follows ALTER COLUMN seguido_id TYPE UUID USING seguido_id::uuid;

-- 4) Recria FKs de forma idempotente
ALTER TABLE social.follows DROP CONSTRAINT IF EXISTS fk_follows_on_seguido;
ALTER TABLE social.follows DROP CONSTRAINT IF EXISTS fk_follows_on_seguidor;
ALTER TABLE social.follows
    ADD CONSTRAINT fk_follows_on_seguido FOREIGN KEY (seguido_id) REFERENCES core.usuarios (id);
ALTER TABLE social.follows
    ADD CONSTRAINT fk_follows_on_seguidor FOREIGN KEY (seguidor_id) REFERENCES core.usuarios (id);

-- 5) Índice único (idempotente) para (seguidor_id, seguido_id)
CREATE UNIQUE INDEX IF NOT EXISTS ux_follows_seguidor_seguido ON social.follows(seguidor_id, seguido_id);


