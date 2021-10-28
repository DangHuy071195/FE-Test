import React from 'react'
import styled from 'styled-components'
import TodosContextProvider from '../../store/todo-context'
import NewTodo from '../components/NewTodo'
import TodoList from '../components/TodoList'

const Container = styled.div`
  display: grid;
  border: 1px solid black;

  grid-template-columns:
    [container-start] 1fr repeat(
      10,
      [col-start] minmax(min-content, 11rem) [col-end]
    )
    1fr [container-end];
  grid-template-rows: 100vh;
  @media screen and (max-width: 768px) {
    grid-template-rows: min-content 1fr;
  }
`

const StlNewTodo = styled.div`
  grid-column: container-start / col-start 4;
  border-right: 1px solid black;
  @media screen and (max-width: 1000px) {
    grid-column: container-start / col-start 5;
    grid-row: 1 / 1;
  }
  /* @media screen and (max-width: 800px) {
    grid-column: container-start / col-start 4;
    grid-row: 1 / 1;
  } */
  @media screen and (max-width: 768px) {
    grid-column: container-start / container-end;
    grid-row: 1 / 1;
  }
`
const StlTodoList = styled.div`
  grid-column: col-start 4 / container-end;
  @media screen and (max-width: 1000px) {
    grid-column: col-start 5 / container-end;
    grid-row: 1 / 1;
  }

  @media screen and (max-width: 768px) {
    grid-column: container-start / container-end;
    grid-row: 2 / -1;
    border-top: 1px solid black;
  }
`

const Todo = () => {
  return (
    <TodosContextProvider>
      <Container>
        <StlNewTodo>
          <NewTodo />
        </StlNewTodo>
        <StlTodoList>
          <TodoList />
        </StlTodoList>
      </Container>
    </TodosContextProvider>
  )
}

export default Todo
