import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

/**
 * Hook Customizado useTasks com suporte a API
 * 
 * Agora inclui:
 * - loading state
 * - error state
 * - reloadTasks para recarregar dados
 */
export function useTasks() {
  const context = useContext(AppContext)
  
  if (!context) {
    throw new Error('useTasks deve ser usado dentro de AppProvider')
  }
  
  return {
    tasks: context.tasks,
    loading: context.loading,
    error: context.error,
    addTask: context.addTask,
    updateTask: context.updateTask,
    deleteTask: context.deleteTask,
    moveTask: context.moveTask,
    reloadTasks: context.reloadTasks
  }
}
