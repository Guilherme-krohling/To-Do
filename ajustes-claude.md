# Instruções de Ajustes e Melhorias - Checkpoint

Este documento detalha as modificações necessárias para implementar novos recursos e refinar o layout da aplicação **Checkpoint**. Siga rigorosamente as instruções e padrões descritos abaixo.

---

## 🛠️ Ajuste 1: Ocultar Seletores de Coluna no Mobile

Nas telas de planejamento que exibem colunas múltiplas, certos seletores de visualização ocupam espaço precioso no mobile e devem ser mostrados apenas em telas maiores (Desktop).

### 📋 Ações:
1. **No arquivo [WeeklyBoard.jsx](file:///d:/projetos/To-Do/checkpoint/src/components/WeeklyBoard.jsx):**
   * A barra superior contendo os botões para alternar a visualização de colunas (`1 Col`, `3 Cols`, `7 Cols`) deve ser ocultada em dispositivos móveis.
   * Adicione classes utilitárias do Tailwind (ex: `hidden md:flex`) na div container desse menu de seleção para que ele apareça somente a partir de telas médias (`md`).
2. **Responsividade Geral:**
   * Garanta que em telas mobile o comportamento padrão do quadro semanal (`WeeklyBoard`) seja o empilhamento das colunas (`grid-cols-1`), mantendo a rolagem vertical de forma limpa.

---

## 📋 Ajuste 2: Nova Função "Checklist" e Simplificação da Tela Daily

A tela **Daily (Diário)** passará por uma reestruturação de layout importante para acomodar uma nova ferramenta de Checklist de tarefas rápidas ao lado do quadro tradicional, que por sua vez será simplificado.

### 📐 Estrutura de Layout do DailyBoard
* **No Desktop (Telas `lg` ou superiores):** O layout deve ser disposto lado a lado (duas colunas horizontais):
  * **Esquerda (30% a 40% de largura):** O novo componente de **Checklist / Lista de Tarefas**.
  * **Direita (Restante da largura):** O quadro **Daily** simplificado (agora contendo apenas **uma única coluna centralizada** em vez de três).
* **No Mobile (Telas menores que `lg`):** Layout empilhado verticalmente:
  * **Topo:** Componente de **Checklist / Lista de Tarefas**.
  * **Abaixo:** O quadro **Daily** simplificado (uma única coluna).

---

### 📝 2.1. O Componente Checklist (Lista de Tarefas)

Crie ou implemente a funcionalidade de Checklist seguindo estas diretrizes:

1. **Entrada de Dados (Formulário):**
   * Um campo de texto para digitar o Nome/Name da tarefa.
   * Um botão `+` (adicionar) estiloso e responsivo para criar a tarefa.
   * Suporte a atalho de teclado: criar a tarefa ao pressionar `Enter`.
2. **Exibição e Numeração Automática:**
   * As tarefas criadas devem ser listadas em formato de cartões (*cards*).
   * Devem ser numeradas automaticamente na tela de acordo com sua posição na lista (ex: `1. Tarefa A`, `2. Tarefa B`).
3. **Ordenação Interativa (Drag and Drop):**
   * O usuário deve poder reordenar a lista arrastando as tarefas para cima ou para baixo usando a biblioteca `@dnd-kit/core` e `@dnd-kit/sortable` (que já está integrada no projeto).
   * Ao reordenar, a **numeração das tarefas deve mudar automaticamente** para refletir a nova ordem (ex: se o item número 3 for arrastado para o topo, ele passa a ser o número 1, e os demais são empurrados para baixo).
4. **Marcação de Conclusão (Checkbox):**
   * Cada cartão deve possuir uma caixa de seleção (*checkbox* / quadrado).
   * Ao marcar o check:
     * O fundo do cartão deve mudar para um **tom de verde harmonioso** (no Light Mode, use um verde suave; no Dark Mode, use o verde da paleta Dracula, como `#50fa7b` com texto escuro, ou um fundo verde correspondente).
     * O texto da tarefa deve ficar com **efeito cortado (tachado / `line-through`)** e opacidade reduzida.
5. **Remoção de Tarefas:**
   * Cada cartão na lista deve possuir um ícone de lixeira.
   * Ao clicar na lixeira, a tarefa é excluída imediatamente da lista.

---

### 🎨 2.2. O Quadro Daily Simplificado (1 Única Coluna)

* O DailyBoard original possui três colunas ("To Do", "In Progress", "Done").
* Altere a tela para que o DailyBoard passe a renderizar **apenas 1 única coluna centralizada** (ex: mantendo apenas a coluna "A Fazer" ou renomeando para "Tarefas do Dia").
* Utilize a mesma estrutura do `GenericBoard` e `Column` para manter o visual perfeitamente padronizado, mas passando apenas 1 coluna na propriedade `columns`.

---

## ⚠️ Cuidados Especiais e Padrões do Projeto

Sempre siga estas boas práticas para que a nova implementação fique homogênea com o resto do código:

* **Persistência Local (LocalStorage):**
  * Não há banco de dados na aplicação.
  * Todas as alterações no Checklist (inserção, exclusão, marcação de check e reordenação por DnD) devem ser salvas instantaneamente no `localStorage` (ex: chave `'checkpoint-checklist-tasks'`).
  * Ao carregar a página, a lista deve ser lida a partir do `localStorage`.
* **Consistência Estética e Temas (Light / Dark):**
  * Siga rigorosamente a paleta de cores Dracula para o Dark Mode e o tema Light original do aplicativo.
  * Use as mesmas classes de sombra, arredondamentos (`rounded-md`, `rounded-lg`), transições (`transition-colors`, `transition-all`) e fontes já estabelecidas no projeto.
* **Internacionalização (Traduções):**
  * Adicione qualquer novo termo estático (como títulos, placeholders e botões do Checklist) no arquivo [translations.js](file:///d:/projetos/To-Do/checkpoint/src/utils/translations.js) para manter o suporte a múltiplos idiomas (Inglês/Português) funcionando perfeitamente.
* **Prevenção de Scroll Indesejado em Mobile:**
  * Garanta que ao interagir com o arrastar de cartões no mobile, a tela do celular não sofra rolagem involuntária (aplique `touch-action: none` e use as restrições corretas dos sensores do `@dnd-kit` conforme feito em [TaskCard.jsx](file:///d:/projetos/To-Do/checkpoint/src/components/TaskCard.jsx)).
