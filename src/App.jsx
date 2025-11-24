import React, { useState } from 'react'
import Header from './components/Header'
import ToDoList from './components/ToDoList'

const initialTodos = [
  { id: Date.now(), text: 'Sample task — edit or delete me', completed: false }
]

export default function App() {
  const [todos, setTodos] = useState(initialTodos)
  const [input, setInput] = useState('')

  const addTodo = (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    const newTodo = { id: Date.now() + Math.random(), text, completed: false }
    setTodos([newTodo, ...todos])
    setInput('')
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const editTodo = (id, newText) => {
    setTodos(todos.map(t => t.id === id ? { ...t, text: newText } : t))
  }

  return (
    <div className="app">
      <div className="container">
        <Header title="To-Do List App" />
        <form className="add-form" onSubmit={addTodo}>
          <input
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="New task"
          />
          <button type="submit">Add</button>
        </form>

        <ToDoList
          todos={todos}
          onDelete={deleteTodo}
          onToggle={toggleComplete}
          onEdit={editTodo}
        />

        <footer className="footer">
          <span>Total: {todos.length}</span>
          <span>Completed: {todos.filter(t => t.completed).length}</span>
        </footer>
      </div>
    </div>
  )
}
