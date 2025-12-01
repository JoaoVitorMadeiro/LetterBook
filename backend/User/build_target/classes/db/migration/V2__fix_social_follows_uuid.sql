-- Recria social.follows com colunas UUID corretas e constraints
DROP TABLE IF EXISTS social.follows CASCADE;

CREATE TABLE social.follows
(
    id          UUID NOT NULL,
    seguidor_id UUID NOT NULL,
    seguido_id  UUID NOT NULL,
    created_at  TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_follows PRIMARY KEY (id)
);

ALTER TABLE social.follows
    ADD CONSTRAINT uc_follows_unique_seguidor_seguido UNIQUE (seguidor_id, seguido_id);

ALTER TABLE social.follows
    ADD CONSTRAINT fk_follows_on_seguido FOREIGN KEY (seguido_id) REFERENCES core.usuarios (id);

ALTER TABLE social.follows
    ADD CONSTRAINT fk_follows_on_seguidor FOREIGN KEY (seguidor_id) REFERENCES core.usuarios (id);


