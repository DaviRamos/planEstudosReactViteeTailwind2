/**
 * DIA 2: Componente Card Reutilizável
 * 
 * Conceitos Tailwind:
 * - Glass morphism effect
 * - Custom shadows (shadow-elegant)
 * - Responsive padding
 * - Dark mode support
 */
function Card({ 
  children, 
  className = '',
  hoverable = false,
  padding = true,
  ...props 
}) {
  const baseClasses = 'glass-effect rounded-xl transition-all duration-300'
  const hoverClasses = hoverable ? 'hover:shadow-elegant-lg hover:scale-[1.02] cursor-pointer' : 'shadow-elegant'
  const paddingClasses = padding ? 'p-6' : 'p-0'
  
  const classes = `${baseClasses} ${hoverClasses} ${paddingClasses} ${className}`
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

export default Card
