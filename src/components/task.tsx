import React, { useState } from "react"

interface TaskProps {
  task: {
    id: string
    description: string
  }
  onDelete: (id: string) => void
  onEdit: (id: string, description: string) => void
}

const Task: React.FC<TaskProps> = ({ task, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [newDescription, setNewDescription] = useState(task.description)

  const handleEdit = () => {
    if (newDescription !== task.description) {
      onEdit(task.id, newDescription)
    }
    setIsEditing(false)
  }

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-md mb-4">
      {isEditing ? (
        <div className="flex flex-col w-full">
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleEdit}
            className="mt-2 bg-blue-500 text-white py-1 px-2 rounded-md"
          >
            Save
          </button>
        </div>
      ) : (
        <>
          <span className="overflow-scroll line-clamp-2 text-ellipsis max-w-[75%]">
            {task.description}
          </span>
          <div className="mt-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500 hover:text-blue-700 mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Task
