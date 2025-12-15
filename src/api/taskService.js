import { apiClient } from './client'

/**
 * DIA 6: Serviço de Tarefas (API)
 * 
 * Conceitos:
 * - Service layer para abstração de API
 * -Async/await para requisições assíncronas
 * - CRUD operations
 */
export const taskService = {
  // GET /tasks - Buscar todas as tarefas
  async getAll() {
    return await apiClient.get('/tasks')
  },
  
  // GET /tasks/:id - Buscar tarefa por ID
  async getById(id) {
    return await apiClient.get(`/tasks/${id}`)
  },
  
  // POST /tasks - Criar nova tarefa
  async create(taskData) {
    return await apiClient.post('/tasks', taskData)
  },
  
  // PUT /tasks/:id - Atualizar tarefa
  async update(id, taskData) {
    return await apiClient.put(`/tasks/${id}`, taskData)
  },
  
  // DELETE /tasks/:id - Deletar tarefa
  async delete(id) {
    return await apiClient.delete(`/tasks/${id}`)
  },
  
  // PATCH /tasks/:id/move - Mover tarefa para outra coluna
  async move(id, column) {
    return await apiClient.request(`/tasks/${id}/move`, {
      method: 'PATCH',
      body: JSON.stringify({ column }),
    })
  },
}
