import React, { useState } from 'react'
import './ToDoList.css'

const ToDoList = () => {
  const [list, updateList] = useState([])
  const [inputValue, setInputValue] = useState('')

  const deleteTask = (id) => {
    const newList = list.filter((task) => task.id !== id)
    updateList(newList)
  }

  const addTask = () => {
    const task = {
      id: list.length === 0 ? 0 : list[list.length - 1].id + 1,
      taskName: inputValue,
      isDone: false,
    }
    updateList([...list, task])
    setInputValue('')
  }

  const toggleTaskStatus = (id) => {
    const updatedList = list.map((task) =>
      task.id === id ? { ...task, isDone: !task.isDone } : task
    )
    updateList(updatedList)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addTask()
    }
  }

  return (
    <>
      <div className="add-todo-container">
        <input
          className="todo-input"
          type="text"
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={handleKeyPress}
          value={inputValue}
        />
        <button className="add-button" onClick={addTask}>
          Add task
        </button>
      </div>

      <div className="todo-list-container">
        {list.map((task) => (
          <div key={task.id} className="task-container">
            <h1 className={`task-name ${task.isDone ? 'done' : 'undone'}`}
              onClick={() => toggleTaskStatus(task.id)}>
              {task.taskName}
            </h1>
            <button className="task-buttons" onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

export default ToDoList
