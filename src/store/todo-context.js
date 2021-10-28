import React, {createContext, useState} from 'react'
import Todo from '../models/Todo'

export const TodosContext = createContext({
  items: [],
  addTodo: () => {},
  removeTodo: () => {},
  updateTodo: () => {},
  updateMultiple: () => {},
})

const TodosContextProvider = (props) => {
  const [todos, setTodos] = useState([])
  const addTodoHandler = ({title, description, duedate, piority}) => {
    const newTodo = new Todo(title, description, duedate, piority)
    setTodos((prevTodos) => {
      const todos = [...prevTodos, newTodo]
      localStorage.setItem('todos', JSON.stringify(todos))

      return todos
    })
  }

  const removeTodoHandler = (todoId) => {
    setTodos((prevTodos) => {
      const todosUpdated = prevTodos.filter((todo) => todo.id !== todoId)
      localStorage.setItem('todos', JSON.stringify(todosUpdated))
      return todosUpdated
    })
  }
  const updateTodoHandler = (data) => {
    setTodos((prevTodos) => {
      const todoList = prevTodos.map((item) => {
        if (item.id === data.id) {
          const itemUpdate = {
            ...item,
            title: data.title,
            description: data.description,
            duedate: data.duedate,
            piority: data.piority,
          }
          item = itemUpdate
        }
        return item
      })
      localStorage.setItem('todos', JSON.stringify(todoList))
      return todoList
    })
  }
  const todosFromStorage = localStorage.getItem('todos')
    ? JSON.parse(localStorage.getItem('todos'))
    : []
  const contextValue = {
    items: todosFromStorage,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHandler,
    updateTodo: updateTodoHandler,
  }

  return (
    <TodosContext.Provider value={contextValue}>
      {props.children}
    </TodosContext.Provider>
  )
}

export default TodosContextProvider
