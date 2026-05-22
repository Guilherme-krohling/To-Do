/**
 * Dicionário de Traduções do Sistema.
 * Estrutura: { idioma: { CHAVE: 'Texto Exibido' } }
 * * IMPORTANTE: As chaves (ex: 'TO_DO', 'LOW') devem ser usadas
 * consistentemente em todo o aplicativo para garantir a troca correta.
 */

export const translations = {
  en: {
    APP_TITLE: 'Checkpoint',
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

    // Menus
    MENU_CHECKLIST: 'Task List',
    MENU_DAILY: 'Daily',
    MENU_WEEKLY: 'Weekly',
    MENU_YEARLY: 'Yearly',

    // Checklist
    CHECKLIST_TITLE: 'Task List',
    CHECKLIST_PLACEHOLDER: 'Add a quick task...',
    CHECKLIST_EMPTY: 'No tasks yet. Add your first one above.',
    DAY_TASKS: 'Day Tasks',

    // Footer
    FOOTER_PROJECT_DESC: 'Interactive project designed to prioritize daily, weekly and even yearly tasks.',
    FOOTER_CREATED_BY: 'Created by',
    FOOTER_COPIED: 'Copied!',

    // Dias da Semana
    MON: 'Monday',
    TUE: 'Tuesday',
    WED: 'Wednesday',
    THU: 'Thursday',
    FRI: 'Friday',
    SAT: 'Saturday',
    SUN: 'Sunday',

    // Meses
    JAN: 'January',
    FEB: 'February',
    MAR: 'March',
    APR: 'April',
    MAY: 'May',
    JUN: 'June',
    JUL: 'July',
    AUG: 'August',
    SEP: 'September',
    OCT: 'October',
    NOV: 'November',
    DEC: 'December',
  },
  pt: {
    APP_TITLE: 'Ponto de Controle',
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

    // Menus
    MENU_CHECKLIST: 'Lista de Tarefas',
    MENU_DAILY: 'Diário',
    MENU_WEEKLY: 'Semanal',
    MENU_YEARLY: 'Anual',

    // Checklist
    CHECKLIST_TITLE: 'Lista de Tarefas',
    CHECKLIST_PLACEHOLDER: 'Adicione uma tarefa rápida...',
    CHECKLIST_EMPTY: 'Nenhuma tarefa ainda. Adicione a primeira acima.',
    DAY_TASKS: 'Tarefas do Dia',

    // Footer
    FOOTER_PROJECT_DESC: 'Projeto interativo pensado para priorizar tarefas diárias, semanais e até anuais.',
    FOOTER_CREATED_BY: 'Criado por',
    FOOTER_COPIED: 'Copiado!',

    // Dias da Semana
    MON: 'Segunda-feira',
    TUE: 'Terça-feira',
    WED: 'Quarta-feira',
    THU: 'Quinta-feira',
    FRI: 'Sexta-feira',
    SAT: 'Sábado',
    SUN: 'Domingo',

    // Meses
    JAN: 'Janeiro',
    FEB: 'Fevereiro',
    MAR: 'Março',
    APR: 'Abril',
    MAY: 'Maio',
    JUN: 'Junho',
    JUL: 'Julho',
    AUG: 'Agosto',
    SEP: 'Setembro',
    OCT: 'Outubro',
    NOV: 'Novembro',
    DEC: 'Dezembro',
  }
};