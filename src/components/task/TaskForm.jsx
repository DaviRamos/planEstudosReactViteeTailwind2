import { useState } from 'react'
import Button from '../common/Button'

/**
 * DIA 4: Componente TaskForm (Formulário de Tarefa)
 * 
 * Conceitos React:
 * - Controlled components (inputs controlados)
 * - Form handling (onSubmit, preventDefault)
 * - useState para campos do formulário
 * - Props (task para edição, onSubmit, onCancel)
 */
function TaskForm({ task, onSubmit, onCancel }) {
  const [title, setTitle] = useState(task?.title || '')
  const [description, setDescription] = useState(task?.description || '')
  const [priority, setPriority] = useState(task?.priority || 'medium')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!title.trim()) {
      alert('O título é obrigatório!')
      return
    }
    
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority
    })
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Campo Título */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Título *
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Digite o título da tarefa"
          className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-dark-card text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          autoFocus
        />
      </div>
      
      {/* Campo Descrição */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Descrição
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Adicione uma descrição (opcional)"
          rows={4}
          className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-dark-card text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none scrollbar-thin"
        />
      </div>
      
      {/* Campo Prioridade */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Prioridade
        </label>
        <div className="grid grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setPriority('low')}
            className={`px-4 py-2 rounded-lg border-2 transition-all ${
              priority === 'low'
                ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-semibold'
                : 'border-slate-300 dark:border-slate-600 hover:border-green-500 text-slate-700 dark:text-slate-300'
            }`}
          >
            Baixa
          </button>
          <button
            type="button"
            onClick={() => setPriority('medium')}
            className={`px-4 py-2 rounded-lg border-2 transition-all ${
              priority === 'medium'
                ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 font-semibold'
                : 'border-slate-300 dark:border-slate-600 hover:border-yellow-500 text-slate-700 dark:text-slate-300'
            }`}
          >
            Média
          </button>
          <button
            type="button"
            onClick={() => setPriority('high')}
            className={`px-4 py-2 rounded-lg border-2 transition-all ${
              priority === 'high'
                ? 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-semibold'
                : 'border-slate-300 dark:border-slate-600 hover:border-red-500 text-slate-700 dark:text-slate-300'
            }`}
          >
            Alta
          </button>
        </div>
      </div>
      
      {/* Botões de Ação */}
      <div className="flex items-center justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
        >
          {task ? 'Salvar Alterações' : 'Criar Tarefa'}
        </Button>
      </div>
    </form>
  )
}

export default TaskForm
