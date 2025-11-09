## LetterBox de Livros — Frontend (React)

Frontend em React (Vite) para a plataforma LetterBox de Livros.

### Tecnologias
- React + Vite
- React Router
- Material UI
- Axios

### Como rodar
1. Instale as dependências
```bash
npm install
```
2. Configure a URL do backend criando um arquivo `.env` na raiz com:
```bash
VITE_API_BASE_URL=http://localhost:8080
```
3. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

### Estrutura principal
- `src/routes/AppRouter.jsx`: rotas e proteção por token
- `src/layout/MainLayout.jsx`: layout com AppBar e navegação
- `src/services/api.js`: cliente Axios com baseURL e token
- `src/pages/*`: telas (Login, Register, ForgotPassword, Feed, Books, Profile, Communities, Rankings, Reviews)

### Observações
- Para autenticação, o token JWT é lido do `localStorage` em `lb_token`.
- Endpoints esperados do backend (exemplos): `/auth/login`, `/auth/register`, `/books`, `/users/me`, `/feed`, `/communities`, `/rankings`, `/reviews`.
