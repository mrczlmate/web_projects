import { useState } from 'react'

export default function TodoInput(props) {
    const { handleAddTodo, todoValue, setTodoValue, inputRef } = props

    return (
        <header>
            <input ref={inputRef} value={todoValue} onChange={(e) => {
                setTodoValue(e.target.value)
            }} type="text" placeholder="Enter todo..." />
            <button onClick={() => {
                handleAddTodo(todoValue)
                setTodoValue('')
            }}>Add</button>
        </header>
    )
}