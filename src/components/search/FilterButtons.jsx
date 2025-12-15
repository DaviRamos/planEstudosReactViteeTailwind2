/**
 * DIA 7: Componente FilterButtons
 * 
 * Conceitos React:
 * - Array.map() para renderizar botões
 * - Conditional styling
 * - onClick handlers
 */
function FilterButtons({ activeFilter, onFilterChange }) {
  const filters = [
    { id: 'all', label: 'Todas', icon: '📋' },
    { id: 'high', label: 'Alta Prioridade', icon: '🔴' },
    { id: 'medium', label: 'Média Prioridade', icon: '🟡' },
    { id: 'low', label: 'Baixa Prioridade', icon: '🟢' },
  ]
  
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map(filter => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            activeFilter === filter.id
              ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
          }`}
        >
          <span className="mr-2">{filter.icon}</span>
          {filter.label}
        </button>
      ))}
    </div>
  )
}

export default FilterButtons
