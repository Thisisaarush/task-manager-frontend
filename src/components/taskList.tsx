import React from "react"
import Task from "./task"

interface TaskListProps {
  tasks: {
    id: string
    description: string
  }[]
  onDelete: (id: string) => void
  onEdit: (id: string, description: string) => void
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onEdit }) => {
  return (
    <div>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  )
}

export default TaskList
