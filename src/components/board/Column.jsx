import TaskCard from './TaskCard'

/**
 * DIA 3: Componente Column (Coluna do Kanban)
 * 
 * Conceitos React:
 * - Props drilling
 * - Renderização de listas com map
 * - Callbacks passados como props
 */
function Column({ column, tasks, onDeleteTask, onEditTask, onMoveTask }) {
  return (
    <div className="flex flex-col h-full">
      {/* Header da Coluna */}
      <div className={`bg-gradient-to-r ${column.color} rounded-t-xl p-4 shadow-md`}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">
            {column.title}
          </h3>
          <span className="bg-white/30 text-white text-sm font-semibold px-3 py-1 rounded-full">
            {tasks.length}
          </span>
        </div>
      </div>
      
      {/* Lista de Tarefas */}
      <div className="flex-1 bg-slate-100/50 dark:bg-slate-800/30 rounded-b-xl p-4 space-y-3 min-h-[400px] scrollbar-thin overflow-y-auto">
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-slate-400 dark:text-slate-500">
            <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-sm">Nenhuma tarefa</p>
          </div>
        ) : (
          tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDeleteTask}
              onEdit={onEditTask}
              onMove={onMoveTask}
              currentColumn={column.id}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Column
