/**
 * Função utilitária para ordenar as tarefas.
 * Regra:
 * 1. Procura por um número no início do título da tarefa (Ex: "1- ", "1)", "2.").
 * 2. Ordena numericamente de forma crescente.
 * 3. Tarefas sem número no início ficam por último.
 * 4. Critério de desempate sempre é a ordem alfabética.
 */
export const sortTasks = (tasks = []) => {
  const pesos = { High: 3, Medium: 2, Low: 1 };

  return [...tasks].sort((a, b) => {
    const titleA = a?.title || "";
    const titleB = b?.title || "";

    // Regex para extrair números no começo do titulo (opcionalmente seguidos de -, . ou ))
    const regex = /^\s*(\d+)(?:[\-\.\)])?\s*/;
    
    const matchA = titleA.match(regex);
    const matchB = titleB.match(regex);

    // Se achou número usa ele, caso contrário joga para o fim (Infinity)
    const numA = matchA ? parseInt(matchA[1], 10) : Infinity;
    const numB = matchB ? parseInt(matchB[1], 10) : Infinity;

    // 1. Ordem Numérica Declarada no Título
    if (numA !== numB) {
      return numA - numB;
    }

    // 2. Peso da Prioridade do Sistema
    const priorityA = pesos[a.priority] || 0;
    const priorityB = pesos[b.priority] || 0;
    if (priorityA !== priorityB) {
      return priorityB - priorityA; 
    }

    // 3. Desempate: Ordem Alfabética
    return titleA.localeCompare(titleB, undefined, { sensitivity: 'base' });
  });
};
