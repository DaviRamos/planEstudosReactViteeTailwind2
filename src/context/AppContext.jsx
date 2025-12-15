import { createContext, useState, useEffect } from 'react'
import { taskService } from '../api/taskService'

/**
 * AppContext integrado com API Backend
 * 
 * Mudanças:
 * - Buscar tarefas da API ao inicializar
 * - Todas as operações CRUD usam a API
 * - Loading states
 * - Error handling
 */
export const AppContext = createContext()

export function AppProvider({ children }) {
  const [tasks, setTasks] = useState([])
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('taskflow-darkmode')
    return saved ? JSON.parse(saved) : false
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Carregar tarefas da API ao inicializar
  useEffect(() => {
    loadTasks()
  }, [])

  // Persistir tema no localStorage
  useEffect(() => {
    localStorage.setItem('taskflow-darkmode', JSON.stringify(darkMode))
  }, [darkMode])

  const loadTasks = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await taskService.getAll()
      setTasks(data)
    } catch (err) {
      console.error('Erro ao carregar tarefas:', err)
      setError(err.message || 'Erro ao carregar tarefas')
      // Em caso de erro, usar localStorage como fallback
      const saved = localStorage.getItem('taskflow-tasks-backup')
      if (saved) {
        setTasks(JSON.parse(saved))
      }
    } finally {
      setLoading(false)
    }
  }

  const addTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData)
      setTasks([...tasks, newTask])
      // Backup em localStorage
      localStorage.setItem('taskflow-tasks-backup', JSON.stringify([...tasks, newTask]))
      return newTask
    } catch (err) {
      console.error('Erro ao criar tarefa:', err)
      throw err
    }
  }

  const updateTask = async (taskId, taskData) => {
    try {
      await taskService.update(taskId, taskData)
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, ...taskData } : task
      ))
      // Backup em localStorage
      const updatedTasks = tasks.map(task => 
        task.id === taskId ? { ...task, ...taskData } : task
      )
      localStorage.setItem('taskflow-tasks-backup', JSON.stringify(updatedTasks))
    } catch (err) {
      console.error('Erro ao atualizar tarefa:', err)
      throw err
    }
  }

  const deleteTask = async (taskId) => {
    try {
      await taskService.delete(taskId)
      const filteredTasks = tasks.filter(task => task.id !== taskId)
      setTasks(filteredTasks)
      // Backup em localStorage
      localStorage.setItem('taskflow-tasks-backup', JSON.stringify(filteredTasks))
    } catch (err) {
      console.error('Erro ao deletar tarefa:', err)
      throw err
    }
  }

  const moveTask = async (taskId, newColumn) => {
    try {
      await taskService.move(taskId, newColumn)
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, column: newColumn } : task
      ))
      // Backup em localStorage
      const updatedTasks = tasks.map(task => 
        task.id === taskId ? { ...task, column: newColumn } : task
      )
      localStorage.setItem('taskflow-tasks-backup', JSON.stringify(updatedTasks))
    } catch (err) {
      console.error('Erro ao mover tarefa:', err)
      throw err
    }
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const value = {
    tasks,
    darkMode,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    toggleDarkMode,
    reloadTasks: loadTasks
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
