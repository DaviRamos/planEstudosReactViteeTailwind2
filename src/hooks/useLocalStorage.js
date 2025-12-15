import { useState, useEffect } from 'react'

/**
 * DIA 5: Hook Customizado useLocalStorage
 * 
 * Conceitos React:
 * - Custom hooks genéricos
 * - Lazy initialization com função
 * - useEffect para sincronização
 */
export function useLocalStorage(key, initialValue) {
  // Lazy initialization: só executa a função na primeira renderização
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Erro ao carregar ${key} do localStorage:`, error)
      return initialValue
    }
  })
  
  // Atualizar localStorage quando o valor mudar
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error(`Erro ao salvar ${key} no localStorage:`, error)
    }
  }, [key, storedValue])
  
  return [storedValue, setStoredValue]
}
