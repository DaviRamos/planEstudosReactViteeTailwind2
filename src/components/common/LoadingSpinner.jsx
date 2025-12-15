/**
 * DIA 6: Componente LoadingSpinner
 * 
 * Conceitos Tailwind:
 * - Animações CSS (animate-spin)
 * - Gradientes
 */
function LoadingSpinner({ size = 'md', text = '' }) {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }
  
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`${sizes[size]} relative`}>
        <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-700"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-primary-500 border-r-primary-500 border-b-transparent border-l-transparent animate-spin"></div>
      </div>
      {text && (
        <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm">
          {text}
        </p>
      )}
    </div>
  )
}

export default LoadingSpinner
