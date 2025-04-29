import { useRef, useState } from 'react'
import { useTodos } from './hooks/useTodos'
import { focusInputToEnd } from './utils/focusInput'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

function App() {
  const { todos, addTodo, deleteTodo, setTodos } = useTodos()
  const [todoValue, setTodoValue] = useState('')
  const inputRef = useRef(null)

  function handleEditTodo(index) {
    const text = todos[index]
    setTodoValue(text)
    deleteTodo(index)
    setTimeout(() => focusInputToEnd(inputRef, text), 0)
  }

  return (
    <>
      <h1>Create Your own Todo List</h1>
      <TodoInput
        inputRef={inputRef}
        todoValue={todoValue}
        setTodoValue={setTodoValue}
        handleAddTodo={addTodo}
      />
      <TodoList
        todos={todos}
        handleEditTodo={handleEditTodo}
        handleDeleteTodo={deleteTodo}
      />
    </>
  )
}

export default App
