# 🦇 Referência de Design System: Tema Dracula (Dark Mode)

Este documento define as diretrizes de estilo, paleta de cores e comportamento de interface baseados no **Tema Dracula Padrão**.

**Instrução para Mapeamento de IA:** O objetivo deste arquivo é servir como um "prompt" de contexto. Quando você solicitar a construção de uma nova tela ou de um projeto inteiro e enviar este arquivo, peça para que a interface siga os padrões estéticos, mapa de cores e comportamento descritos abaixo, independentemente da tecnologia (HTML/CSS Puro, React, Flutter, Vue.js etc). O resultado será moderno, de cores vibrantes sobre tons escuros elegantes.

---

## 🎨 Paleta de Cores (Padrão Oficial Dracula)

Abaixo estão os códigos hexadecimais (HEX) oficias e seus equivalentes de uso na interface:

| Elemento / Nome Oficial | Hexadecimal | Descrição e Uso na UI |
| :--- | :--- | :--- |
| **Background** | `#282a36` | Background principal da aplicação. Azul marinho muito escuro. |
| **Current Line / Surface** | `#44475a` | Fundo de elementos sobrepostos (Cards, Modais, Navbars, Sidebars e campos de input). |
| **Foreground / Text** | `#f8f8f2` | Branco Gelo. Usado para títulos em destaque, textos primários e ícones. |
| **Comment / Muted** | `#6272a4` | Roxo acinzentado. Textos secundários, placeholders, legendas e bordas sutis. |
| **Purple (Primária)** | `#bd93f9` | Roxo vibrante. Cor principal (Botões calls-to-action principais, links ativos). |
| **Pink (Secundária)** | `#ff79c6` | Rosa vibrante. Usado para destaques, badges, seleção ativa ou gradientes. |
| **Green (Sucesso)** | `#50fa7b` | Verde neon. Mensagens de sucesso, status positivo, botões de confirmação. |
| **Red (Erro/Perigo)** | `#ff5555` | Vermelho. Alertas, validações de erro, botões destrutivos. |
| **Orange (Alerta)** | `#ffb86c` | Laranja. Avisos importantes (warnings mais chamativos). |
| **Yellow (Aviso)** | `#f1fa8c` | Amarelo. Detalhes chamativos, marcações ou avisos secundários. |
| **Cyan (Info)** | `#8be9fd` | Ciano. Mensagens informativas ou elementos interativos secundários frios. |

> **Nota sobre o "Comment":** No código original deste projeto foi usado `#A8B2D1` em vez do padrão oficial `#6272a4`. O `#A8B2D1` tende a dar um contraste de leitura maior em alguns monitores, mas o padronizado universalmente pelo Tema Dracula para textos "apagados" é o `#6272a4`. Recomenda-se testar as duas opções em produção.

---

## 📐 Diretrizes de Implementação e UX/UI

### 1. Sistema de "Elevations" (Níveis da Interface)
Como o fundo é escuro, sombras naturais (pretas ou cinzas) tendem a não aparecer bem.
- O nível 0 da página (`body`) sempre utiliza o background `#282a36`.
- O nível 1 da página (componentes estruturais e modais) utiliza `#44475a`.
- A distinção entre áreas é feita **pela diferença de tons de fundo**, e caso precise de sombreado, use box-shadow escuros e espalhados (Ex: `rgba(0, 0, 0, 0.4)`) ao invés de sombras padrão.
- Adicione pequenas bordas de separação entre containers se preciso (ex: `1px solid #6272a4` com 30% a 50% de transparência).

### 2. Gradientes Premium (Glassmorphism sutil)
- Crie gradientes lineares incríveis usando **Purple (`#bd93f9`)** para **Pink (`#ff79c6`)** em banners, botões de destaque máximo ou ícones especiais.
- Ao usar Glassmorphism (fundo translúcido com `backdrop-filter: blur`), certifique-se de manter os textos no "Foreground" legíveis.

### 3. Tipografia Moderna e Arredondamento (Border Radius)
- Fontes ideais para a estética Dracula: **Inter**, **Roboto** ou **Outfit**.
- Crie designs orgânicos (menos quinas vivas): as telas devem conter "Border Radius" generosos (ex: `8px`, `12px` ou `16px`), combinando com as vibrações em tons neon.

### 4. Interações Dinâmicas (Micro-animações e Hover Base)
- O padrão Dracula é neon/cyberpunk macio. Todos os componentes clicáveis ou formulários devem ter animações curtas de transição (ex: `transition: all 0.2s ease`).
- Ao focar (`:focus`) num campo ou passar o cursor (`:hover`), não mude apenas a cor – troque da Primária para Secundária de forma sutil, ou aplique pequenos "glows", utilizando por exemplo drop-shadows da cor de destaque. (Exemplo: se o botão é roxo `#bd93f9`, no hover ele pode se aproximar do rosa `#ff79c6`).

---

## 💻 Exemplo de Referência no Tailwind (Pode ser ignorado dependendo do projeto)

```javascript
// Exemplo de como plugar no tailwind.config.js de qualquer projeto Tailwind.
module.exports = {
  theme: {
    extend: {
      colors: {
        dracula: {
          bg: '#282a36',
          current: '#44475a',
          fg: '#f8f8f2',
          comment: '#6272a4',
          cyan: '#8be9fd',
          green: '#50fa7b',
          orange: '#ffb86c',
          pink: '#ff79c6',
          purple: '#bd93f9',
          red: '#ff5555',
          yellow: '#f1fa8c',
        }
      }
    }
  }
}
```
