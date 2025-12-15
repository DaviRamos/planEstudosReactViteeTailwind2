import { useContext } from 'react'
import { AppProvider, AppContext } from './context/AppContext'
import Header from './components/layout/Header'
import Board from './components/board/Board'

/**
 * DIA 5: App Refatorado com Context API
 * 
 * Conceitos React:
 * - Context Provider envolvendo toda a aplicação
 * - useContext para consumir estado global
 * - Lifting state up para Context
 */
function AppContent() {
  const { darkMode } = useContext(AppContext)

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen transition-colors duration-300">
        <Header />
        <Board />
      </div>
    </div>
  )
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

export default App
