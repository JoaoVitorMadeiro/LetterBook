CREATE TABLE core.usuarios
(
    id                      UUID         NOT NULL,
    nome                    VARCHAR(100) NOT NULL,
    email                   VARCHAR(100) NOT NULL,
    senha                   VARCHAR(255) NOT NULL,
    foto_url                VARCHAR(255),
    biografia               VARCHAR(255),
    token_recuperacao_senha VARCHAR(255),
    data_expiracao_token    TIMESTAMP WITHOUT TIME ZONE,
    created_at              TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    updated_at              TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_usuarios PRIMARY KEY (id)
);

ALTER TABLE core.usuarios
    ADD CONSTRAINT uc_usuarios_email UNIQUE (email);

CREATE TABLE social.follows
(
    id          UUID NOT NULL,
    seguidor_id UUID NOT NULL,
    seguido_id  UUID NOT NULL,
    created_at  TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_follows PRIMARY KEY (id)
);

CREATE TABLE social.seguidores
(
    id          UUID NOT NULL,
    seguidor_id UUID NOT NULL,
    seguido_id  UUID NOT NULL,
    created_at  TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_seguidores PRIMARY KEY (id)
);

CREATE TABLE social.user_profiles
(
    id                 UUID    NOT NULL,
    usuario_id         UUID    NOT NULL,
    foto_url           VARCHAR(255),
    biografia          TEXT,
    data_nascimento    TIMESTAMP WITHOUT TIME ZONE,
    localizacao        VARCHAR(100),
    website            VARCHAR(255),
    total_seguidores   INTEGER NOT NULL,
    total_seguindo     INTEGER NOT NULL,
    total_livros_lidos INTEGER NOT NULL,
    created_at         TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    updated_at         TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT pk_user_profiles PRIMARY KEY (id)
);

ALTER TABLE social.follows
    ADD CONSTRAINT uc_5050ebd9398084f838a06f865 UNIQUE (seguidor_id, seguido_id);

ALTER TABLE social.seguidores
    ADD CONSTRAINT uc_792dff8d82d9ba3e6ba88f93d UNIQUE (seguidor_id, seguido_id);

ALTER TABLE social.user_profiles
    ADD CONSTRAINT uc_user_profiles_usuario UNIQUE (usuario_id);

ALTER TABLE social.follows
    ADD CONSTRAINT FK_FOLLOWS_ON_SEGUIDO FOREIGN KEY (seguido_id) REFERENCES core.usuarios (id);

ALTER TABLE social.follows
    ADD CONSTRAINT FK_FOLLOWS_ON_SEGUIDOR FOREIGN KEY (seguidor_id) REFERENCES core.usuarios (id);

ALTER TABLE social.user_profiles
    ADD CONSTRAINT FK_USER_PROFILES_ON_USUARIO FOREIGN KEY (usuario_id) REFERENCES core.usuarios (id);