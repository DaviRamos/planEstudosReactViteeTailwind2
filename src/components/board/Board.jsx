import { useState, useMemo } from 'react'
import { useTasks } from '../../hooks/useTasks'
import { filterTasksBySearch, filterTasksByPriority } from '../../utils/helpers'
import Column from './Column'
import Modal from '../common/Modal'
import TaskForm from '../task/TaskForm'
import Button from '../common/Button'
import SearchBar from '../search/SearchBar'
import FilterButtons from '../search/FilterButtons'
import Card from '../common/Card'
import LoadingSpinner from '../common/LoadingSpinner'
import ErrorMessage from '../common/ErrorMessage'

/**
 * Board com Integração API
 * 
 * Conceitos:
 * - Loading states durante fetch da API
 * - Error handling com retry
 * - Feedback visual (LoadingSpinner, ErrorMessage)
 */
function Board() {
  const { tasks, loading, error, addTask, updateTask, deleteTask, moveTask, reloadTasks } = useTasks()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  
  const columns = [
    { id: 'todo', title: 'A Fazer', color: 'from-slate-500 to-slate-600' },
    { id: 'doing', title: 'Em Progresso', color: 'from-primary-500 to-primary-600' },
    { id: 'done', title: 'Concluído', color: 'from-green-500 to-green-600' },
  ]
  
  // Filtrar tarefas com useMemo para otimização
  const filteredTasks = useMemo(() => {
    let result = tasks
    result = filterTasksBySearch(result, searchTerm)
    result = filterTasksByPriority(result, activeFilter)
    return result
  }, [tasks, searchTerm, activeFilter])
  
  const handleAddTask = async (taskData) => {
    try {
      await addTask(taskData)
      setIsModalOpen(false)
    } catch (err) {
      alert('Erro ao criar tarefa: ' + err.message)
    }
  }
  
  const handleUpdateTask = async (taskData) => {
    try {
      await updateTask(editingTask.id, taskData)
      setEditingTask(null)
      setIsModalOpen(false)
    } catch (err) {
      alert('Erro ao atualizar tarefa: ' + err.message)
    }
  }
  
  const handleDeleteTask = async (taskId) => {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      try {
        await deleteTask(taskId)
      } catch (err) {
        alert('Erro ao deletar tarefa: ' + err.message)
      }
    }
  }
  
  const openEditModal = (task) => {
    setEditingTask(task)
    setIsModalOpen(true)
  }
  
  const openAddModal = () => {
    setEditingTask(null)
    setIsModalOpen(true)
  }

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LoadingSpinner size="lg" text="Carregando tarefas..." />
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorMessage message={error} onRetry={reloadTasks} />
      </div>
    )
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header com botão de adicionar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Meu Quadro
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            {filteredTasks.length} {filteredTasks.length === 1 ? 'tarefa encontrada' : 'tarefas encontradas'}
            {tasks.length !== filteredTasks.length && ` de ${tasks.length} no total`}
          </p>
        </div>
        <Button onClick={openAddModal} variant="primary">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Nova Tarefa</span>
          </div>
        </Button>
      </div>
      
      {/* Barra de Busca e Filtros */}
      <Card className="mb-6">
        <div className="space-y-4">
          <SearchBar 
            onSearch={setSearchTerm}
            placeholder="Buscar tarefas por título ou descrição..."
          />
          <FilterButtons 
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>
      </Card>
      
      {/* Colunas do Kanban */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map(column => (
          <Column
            key={column.id}
            column={column}
            tasks={filteredTasks.filter(task => task.column === column.id)}
            onDeleteTask={handleDeleteTask}
            onEditTask={openEditModal}
            onMoveTask={moveTask}
          />
        ))}
      </div>
      
      {/* Modal de Adicionar/Editar Tarefa */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingTask(null)
        }}
        title={editingTask ? 'Editar Tarefa' : 'Nova Tarefa'}
      >
        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? handleUpdateTask : handleAddTask}
          onCancel={() => {
            setIsModalOpen(false)
            setEditingTask(null)
          }}
        />
      </Modal>
    </div>
  )
}

export default Board
