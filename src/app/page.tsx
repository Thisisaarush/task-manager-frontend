"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import TaskList from "@/components/taskList"
import TaskForm from "@/components/taskForm"

interface Task {
  id: string
  description: string
  created_at: string
}

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const SERVER_URL = process?.env?.NEXT_PUBLIC_SERVER_URL

  useEffect(() => {
    // Fetch all tasks on initial render
    const fetchTasks = async () => {
      try {
        const response = await axios.get<Task[]>(`${SERVER_URL}/tasks`)
        setTasks(response.data)
      } catch (error) {
        console.error("Error fetching tasks:", error)
      }
    }

    fetchTasks()
  }, [SERVER_URL])

  // Add a new task
  const addTask = async (description: string) => {
    try {
      const response = await axios.post<Task>(`${SERVER_URL}/tasks`, {
        description,
      })
      setTasks([...tasks, response.data])
    } catch (error) {
      console.error("Error adding task:", error)
    }
  }

  // Delete a task
  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`${SERVER_URL}/tasks/${id}`)
      setTasks(tasks.filter((task) => task.id !== id))
    } catch (error) {
      console.error("Error deleting task:", error)
    }
  }

  // Edit a task
  const editTask = async (id: string, description: string) => {
    try {
      const response = await axios.put<Task>(`${SERVER_URL}/tasks/${id}`, {
        description,
      })
      setTasks(tasks.map((task) => (task.id === id ? response.data : task)))
    } catch (error) {
      console.error("Error updating task:", error)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <h1 className="text-2xl font-bold mb-6">Task Manager</h1>
      <TaskForm onAdd={addTask} />
      <TaskList tasks={tasks} onDelete={deleteTask} onEdit={editTask} />
    </div>
  )
}

export default Home
