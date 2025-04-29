import React from 'react'

export default function TodoCard(props) {
    const { children, handleDeleteTodo, handleEditTodo, index } = props

    return (
    <li className='todoItem'>
        {children}
        <div className='actionsContainer'>
            <button onClick={() => handleEditTodo(index)} className="icon-mod">
                <i className='fa-solid fa-pen-to-square'></i>    
            </button>
            <button onClick={() => handleDeleteTodo(index)} className="icon-del">
                <i className='fa-regular fa-trash-can'></i>
            </button>
        </div>
    </li>
    )
}
