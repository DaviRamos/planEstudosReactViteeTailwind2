import { useState } from 'react'
import Card from '../common/Card'

/**
 * DIA 4: Componente TaskCard (Card de Tarefa)
 * 
 * Conceitos React:
 * - Drag and Drop (HTML5 API)
 * - Event handlers (onDragStart, onDragEnd, onDrop)
 * - Conditional styling
 */
function TaskCard({ task, onDelete, onEdit, onMove, currentColumn }) {
  const [isDragging, setIsDragging] = useState(false)
  
  const priorityColors = {
    high: 'border-l-4 border-red-500',
    medium: 'border-l-4 border-yellow-500',
    low: 'border-l-4 border-green-500',
  }
  
  const handleDragStart = (e) => {
    setIsDragging(true)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('taskId', task.id.toString())
  }
  
  const handleDragEnd = () => {
    setIsDragging(false)
  }
  
  const moveToColumn = (columnId) => {
    if (columnId !== currentColumn) {
      onMove(task.id, columnId)
    }
  }
  
  return (
    <Card
      className={`${priorityColors[task.priority]} ${isDragging ? 'opacity-50' : 'opacity-100'} cursor-move`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      padding={false}
    >
      <div className="p-4">
        {/* Título */}
        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
          {task.title}
        </h4>
        
        {/* Descrição */}
        {task.description && (
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
            {task.description}
          </p>
        )}
        
        {/* Badge de Prioridade */}
        <div className="flex items-center justify-between">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            task.priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
            task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
            'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
          }`}>
            {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Média' : 'Baixa'}
          </span>
          
          {/* Botões de Ação */}
          <div className="flex items-center space-x-1">
            <button
              onClick={() => onEdit(task)}
              className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-dark-hover transition-colors"
              aria-label="Editar tarefa"
            >
              <svg className="w-4 h-4 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              aria-label="Deletar tarefa"
            >
              <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Menu de Movimentação Rápida */}
      <div className="border-t border-slate-200 dark:border-slate-700 px-4 py-2 bg-slate-50 dark:bg-slate-800/50 flex items-center space-x-2">
        <span className="text-xs text-slate-500 dark:text-slate-400">Mover para:</span>
        {currentColumn !== 'todo' && (
          <button
            onClick={() => moveToColumn('todo')}
            className="text-xs px-2 py-1 rounded bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
          >
            A Fazer
          </button>
        )}
        {currentColumn !== 'doing' && (
          <button
            onClick={() => moveToColumn('doing')}
            className="text-xs px-2 py-1 rounded bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
          >
            Em Progresso
          </button>
        )}
        {currentColumn !== 'done' && (
          <button
            onClick={() => moveToColumn('done')}
            className="text-xs px-2 py-1 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
          >
            Concluído
          </button>
        )}
      </div>
    </Card>
  )
}

export default TaskCard
