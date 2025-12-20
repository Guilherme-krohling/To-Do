/**
 * Dicionário de Traduções do Sistema.
 * Estrutura: { idioma: { CHAVE: 'Texto Exibido' } }
 * * IMPORTANTE: As chaves (ex: 'TO_DO', 'LOW') devem ser usadas
 * consistentemente em todo o aplicativo para garantir a troca correta.
 */

export const translations = {
  en: {
    //Colunas
    TO_DO: 'To Do',
    IN_PROGRESS: 'In Progress',
    DONE: 'Done',

    // Labels e Botões
    PRIORITY: 'Priority',
    TASK_NAME: 'Task Name',
    NEW_TASK: 'New Task',
    BTN_ADD: 'Add',

    // Prioridades
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
    
    // Temas
    THEME_DARK: 'Dark',
    THEME_LIGHT: 'Light',
  },
  pt: {
    TO_DO: 'A Fazer',
    IN_PROGRESS: 'Em Andamento',
    DONE: 'Feito',
    PRIORITY: 'Prioridade',
    TASK_NAME: 'Nome da Tarefa',
    LOW: 'Baixa',
    MEDIUM: 'Média',
    HIGH: 'Alta',
    NEW_TASK: 'Nova Tarefa',
    BTN_ADD: 'Adicionar',
    THEME_DARK: 'Escuro',
    THEME_LIGHT: 'Claro',
  }
};