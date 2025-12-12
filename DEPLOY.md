# Guia de Implantação (Deployment)

## Frontend (LetterBookFront) - Firebase Hosting

O projeto foi configurado para ser implantado no Firebase Hosting.

### Pré-requisitos
1. Instale o Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```
2. Faça login no Firebase:
   ```bash
   firebase login
   ```

### Configuração
1. Copie o arquivo de exemplo de ambiente:
   ```bash
   cp LetterBookFront/.env.example LetterBookFront/.env.production
   ```
2. Edite `.env.production` e defina `BACKEND_URL` para a URL do seu backend de produção (ex: Cloud Run URL).

### Deploy
Para fazer o deploy manual:
```bash
cd LetterBookFront
firebase deploy
```

*Nota: O projeto também contém `apphosting.yaml`, sugerindo suporte ao novo Firebase App Hosting (integrado ao GitHub).*

## Backend - Docker / Cloud Run

O backend foi configurado com um `Dockerfile` genérico que pode construir qualquer um dos microserviços.

### Construir uma Imagem
Para construir a imagem de um serviço específico (ex: Gateway), execute na raiz do projeto:

```bash
docker build --build-arg SERVICE_NAME=Gateway -t letterbook-gateway -f backend/Dockerfile backend/
```
Substitua `Gateway` pelo nome do módulo desejado (`User`, `Interaction`, `catalogo`, `Community`).

### Rodar Localmente (Docker)
```bash
docker run -p 8080:8080 letterbook-gateway
```

### Deploy no Google Cloud Run (via Firebase/GCP)
1. Envie a imagem para o Google Container Registry ou Artifact Registry.
2. Crie um serviço no Cloud Run usando essa imagem.
3. Configure as variáveis de ambiente necessárias (banco de dados, etc.).
