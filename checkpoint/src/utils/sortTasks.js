/**
 * Função utilitária para ordenar as tarefas.
 * Regra:
 * 1. Prioridade primeiro: High > Medium > Low (grupos sempre juntos).
 * 2. Dentro de cada grupo de prioridade, ordena numericamente pelo número no início do título.
 * 3. Tarefas sem número no início ficam após as numeradas dentro do mesmo grupo.
 * 4. Critério de desempate final é a ordem alfabética.
 */
export const sortTasks = (tasks = []) => {
  const pesos = { High: 3, Medium: 2, Low: 1 };

  return [...tasks].sort((a, b) => {
    // 1. Peso da Prioridade do Sistema (sempre primeiro!)
    const priorityA = pesos[a.priority] || 0;
    const priorityB = pesos[b.priority] || 0;
    if (priorityA !== priorityB) {
      return priorityB - priorityA; // High (3) antes de Medium (2) antes de Low (1)
    }

    // 2. Ordem Numérica Declarada no Título (dentro do mesmo grupo de prioridade)
    const titleA = a?.title || "";
    const titleB = b?.title || "";

    // Regex para extrair números no começo do titulo (opcionalmente seguidos de -, . ou ))
    const regex = /^\s*(\d+)(?:[\-\.\)])?\s*/;
    
    const matchA = titleA.match(regex);
    const matchB = titleB.match(regex);

    // Se achou número usa ele, caso contrário joga para o fim (Infinity)
    const numA = matchA ? parseInt(matchA[1], 10) : Infinity;
    const numB = matchB ? parseInt(matchB[1], 10) : Infinity;

    if (numA !== numB) {
      return numA - numB;
    }

    // 3. Desempate: Ordem Alfabética
    return titleA.localeCompare(titleB, undefined, { sensitivity: 'base' });
  });
};
