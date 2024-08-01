import React, { useState } from "react"

interface TaskFormProps {
  onAdd: (description: string) => void
}

const TaskForm: React.FC<TaskFormProps> = ({ onAdd }) => {
  const [description, setDescription] = useState<string>("")
  const [error, setError] = useState<string>("")

  const validateDescription = (desc: string): string => {
    if (!desc) {
      return "Description is required"
    }
    if (desc.length < 5) {
      return "Description must be at least 5 characters long"
    }
    if (desc.length > 100) {
      return "Description must be less than 100 characters long"
    }
    if (/[^a-zA-Z0-9 ]/g.test(desc)) {
      return "Description contains invalid characters"
    }
    return ""
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validationError = validateDescription(description)
    if (validationError) {
      setError(validationError)
      return
    }
    onAdd(description)
    setDescription("")
    setError("")
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
          placeholder="New task description"
        />
        {error && <span className="text-red-500 text-sm mt-2">{error}</span>}
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
      >
        Add Task
      </button>
    </form>
  )
}

export default TaskForm
