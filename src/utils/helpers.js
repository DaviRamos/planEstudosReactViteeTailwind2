/**
 * Funções utilitárias para o aplicativo
 */

/**
 * Formata uma data para o formato brasileiro
 */
export function formatDate(dateString) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

/**
 * Filtra tarefas com base em termo de busca
 */
export function filterTasksBySearch(tasks, searchTerm) {
  if (!searchTerm.trim()) return tasks
  
  const term = searchTerm.toLowerCase()
  return tasks.filter(task => 
    task.title.toLowerCase().includes(term) ||
    (task.description && task.description.toLowerCase().includes(term))
  )
}

/**
 * Filtra tarefas por prioridade
 */
export function filterTasksByPriority(tasks, priority) {
  if (priority === 'all') return tasks
  return tasks.filter(task => task.priority === priority)
}

/**
 * Gera ID único
 */
export function generateId() {
  return Date.now() + Math.random()
}

/**
 * Debounce function para otimização de inputs
 */
export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
