/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ADICIONEI AS CORES DO DRACULA AQUI:
      colors: {
        dracula: {
          bg: '#282a36',       // Fundozão (Azul escuro)
          current: '#44475a',  // Cinza/Roxo para Cards e Colunas
          fg: '#f8f8f2',       // Texto Principal (Branco Gelo)
          comment: '#A8B2D1',  // Texto Secundário (Roxo azulado)
          purple: '#bd93f9',   // Roxo Vibrante (Botões)
          pink: '#ff79c6',     // Rosa (Detalhes)
          green: '#50fa7b',    // Verde
          red: '#ff5555',      // Vermelho
          orange: '#ffb86c',   // Laranja
        }
      }
    },
  },
  plugins: [],
}