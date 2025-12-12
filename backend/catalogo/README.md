# Catálogo de Livros - API REST

Sistema de catálogo de livros desenvolvido com Spring Boot, oferecendo endpoints REST para gerenciar livros, autores, editoras e gêneros.

## Tecnologias

- Java 21
- Spring Boot 3.5.7
- Spring Data JPA
- PostgreSQL
- Bean Validation
- Maven

## Estrutura do Banco de Dados

O sistema utiliza o schema `core` do PostgreSQL com as seguintes tabelas:

- `autores`: Informações sobre os autores dos livros
- `editoras`: Dados das editoras
- `generos`: Gêneros literários
- `livros`: Catálogo central de livros
- `livro_autores`: Tabela de junção para múltiplos autores por livro
- `livro_generos`: Tabela de junção para múltiplos gêneros por livro

## Requisitos

- Java 21+
- Maven 3.6+
- PostgreSQL 12+

## Configuração

1. Crie o banco de dados PostgreSQL:

```sql
CREATE DATABASE letterbook_db;
```

2. Execute os scripts SQL para criar o schema e as tabelas conforme o DDL fornecido no início do projeto

3. Configure as credenciais do banco em `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/letterbook_db
spring.datasource.username=letterbook_user
spring.datasource.password=letterbook_app
```

4. Compile e execute a aplicação:

```bash
mvn clean install
mvn spring-boot:run
```

A API estará disponível em `http://localhost:8081`

## Endpoints da API

### Autores

- `POST /api/autores` - Criar autor
- `GET /api/autores?page=0&size=10&sortBy=nome` - Listar autores (paginado)
- `GET /api/autores/{id}` - Buscar autor por ID
- `DELETE /api/autores/{id}` - Deletar autor

### Editoras

- `POST /api/editoras` - Criar editora
- `GET /api/editoras?page=0&size=10&sortBy=nome` - Listar editoras (paginado)
- `GET /api/editoras/{id}` - Buscar editora por ID
- `DELETE /api/editoras/{id}` - Deletar editora

### Gêneros

- `POST /api/generos` - Criar gênero
- `GET /api/generos?page=0&size=10&sortBy=nome` - Listar gêneros (paginado)
- `GET /api/generos/{id}` - Buscar gênero por ID
- `DELETE /api/generos/{id}` - Deletar gênero

### Livros

- `POST /api/livros` - Criar livro
- `GET /api/livros?page=0&size=10&sortBy=titulo` - Listar livros (paginado)
- `GET /api/livros/{id}` - Buscar livro por ID
- `DELETE /api/livros/{id}` - Deletar livro

## Exemplos de Uso

### Criar um Autor

```bash
curl -X POST http://localhost:8080/api/autores \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "J. R. R. Tolkien",
    "dataNascimento": "1892-01-03",
    "biografia": "Autor de O Senhor dos Anéis"
  }'
```

### Criar uma Editora

```bash
curl -X POST http://localhost:8080/api/editoras \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "HarperCollins"
  }'
```

### Criar um Gênero

```bash
curl -X POST http://localhost:8080/api/generos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Fantasia"
  }'
```

### Criar um Livro

```bash
curl -X POST http://localhost:8080/api/livros \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "O Senhor dos Anéis",
    "isbn": "9788578270698",
    "sinopse": "Uma aventura épica na Terra Média",
    "capaUrl": "https://exemplo.com/capa.jpg",
    "anoPublicacao": 1954,
    "editoraId": "UUID_DA_EDITORA",
    "autoresIds": ["UUID_DO_AUTOR"],
    "generosIds": ["UUID_DO_GENERO"]
  }'
```

### Listar Livros

```bash
curl -X GET "http://localhost:8080/api/livros?page=0&size=10&sortBy=titulo"
```

## Funcionalidades

### CRUD Completo
- Endpoints REST para criação, listagem, busca por ID e remoção de registros
- Uso de DTOs (Request/Response) para garantir segurança e desacoplamento

### Validação de Dados
- Bean Validation aplicada em todos os DTOs de entrada
- Mensagens de erro amigáveis e padronizadas

### Paginação
- Todos os endpoints de listagem suportam paginação via parâmetros `page` e `size`
- Otimização de consultas e escalabilidade

### Tratamento Global de Exceções
- Handler global para erros de validação, argumentos inválidos e exceções inesperadas
- Respostas JSON padronizadas para todos os erros

### Auditoria Automática
- Campos `createdAt` e `updatedAt` preenchidos automaticamente via JPA
- Rastreabilidade das operações

### Relacionamentos
- Múltiplos autores por livro
- Múltiplos gêneros por livro
- Relação com editora
- Validação de relacionamentos antes da persistência

## Resposta de Erros

Todos os erros são retornados em formato JSON padronizado:

```json
{
  "timestamp": "2024-01-15T10:30:00.000-03:00",
  "status": 404,
  "error": "Not Found",
  "message": "Livro não encontrado com ID: xxxxx-xxxxx-xxxxx",
  "path": "/api/livros/xxxxx-xxxxx-xxxxx"
}
```

Para erros de validação, também são retornados os campos específicos:

```json
{
  "timestamp": "2024-01-15T10:30:00.000-03:00",
  "status": 400,
  "error": "Validation Error",
  "message": "Erro de validação nos campos",
  "path": "/api/livros",
  "validationErrors": {
    "titulo": "Título é obrigatório"
  }
}
```

## Observações Importantes

1. Sempre envie o header `Content-Type: application/json` nas requisições POST/PUT
2. Certifique-se de criar autores, editoras e gêneros antes de criar livros
3. Use os IDs retornados pela API para associar relacionamentos
4. Todos os IDs são UUIDs
5. A paginação usa página 0 como primeira página

## Licença

Este projeto foi desenvolvido para fins educacionais.

