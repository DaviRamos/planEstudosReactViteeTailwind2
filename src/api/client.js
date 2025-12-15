/**
 * DIA 6: Cliente HTTP para API
 * 
 * Conceitos:
 * - Configuração centralizada de requisições
 * - Interceptors para headers
 * - Error handling
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL
  }
  
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    }
    
    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Erro desconhecido' }))
        throw new Error(error.message || `HTTP ${response.status}`)
      }
      
      // Se for 204 No Content, retornar null
      if (response.status === 204) {
        return null
      }
      
      return await response.json()
    } catch (error) {
      console.error('Erro na requisição:', error)
      throw error
    }
  }
  
  get(endpoint) {
    return this.request(endpoint, { method: 'GET' })
  }
  
  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }
  
  put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }
  
  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' })
  }
}

export const apiClient = new ApiClient(API_BASE_URL)
