/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#14181c', // Fundo principal (quase preto)
        surface: '#1e2328',    // Linhas e fundos secundários
        card: '#2c3440',       // Cor base dos elementos cinzas
        primary: '#00e054',    // Verde do botão Add e Pro
        secondary: '#445566',  // Cinza azulado (textos e ícones inativos)
        userBar: '#567',       // Azul acinzentado da barra de usuário no card
        textMain: '#ffffff',
        textMuted: '#99aabb',
      },
      fontFamily: {
        sans: ['Graphik', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}