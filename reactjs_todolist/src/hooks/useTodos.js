import { useState, useEffect } from 'react'

export function useTodos() {
  const [todos, setTodos] = useState([])

  function persistData(newList) {
    localStorage.setItem('todos', JSON.stringify({ todos: newList }))
  }

  function addTodo(todo) {
    const newList = [...todos, todo]
    persistData(newList)
    setTodos(newList)
  }

  function deleteTodo(index) {
    const filtered = todos.filter((_, i) => i !== index)
    persistData(filtered)
    setTodos(filtered)
  }

  useEffect(() => {
    const localTodos = localStorage.getItem('todos')
    if (localTodos) {
      try {
        const parsed = JSON.parse(localTodos)
        if (Array.isArray(parsed.todos)) setTodos(parsed.todos)
      } catch {}
    }
  }, [])

  return { todos, addTodo, deleteTodo, setTodos }
}