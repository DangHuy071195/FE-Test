import React, {useState, useContext, useEffect} from 'react'
import styled from 'styled-components'
import {TodosContext} from '../../store/todo-context'
import Input from '../../shared/components/FormElements/Input'
import TodoItem from './TodoItem'
import Button from '../../shared/components/FormElements/Button'
import useForm from '../../shared/hooks/form-hook'
import {VALIDATOR_REQUIRE} from '../../shared/util/validators'

const WrapperTodoList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const StlNewTodo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 3rem 4.5rem 4.5rem 5.5rem;

  p {
    text-align: center;
    font-size: calc(1.2rem + 1vw);
    font-weight: 400;
    line-height: 18px;
    font-weight: 700;
    margin-bottom: 5.7rem;
    @media screen and (min-width: 1440px) {
      font-size: calc(1.6rem + 0.5vw);
    }
  }
  button {
    /* margin-top: 4rem; */
  }
`

const StlAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  border: 1px solid black;
  padding: 1rem;
  & .todo-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    input {
      min-width: 2rem;
      height: 2rem;
      margin-right: 1rem;
    }
  }
  & .action__button {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
const StlyBulkAction = styled(StlAction)`
  background-color: #e0e0e0;
  height: 8.2rem;
  border-left: none;
  border-right: none;
`

const TodoList = () => {
  const todosCtx = useContext(TodosContext)
  const [showedDetails, setShowedDetails] = useState([])

  useEffect(() => {
    setShowedDetails(new Array(todosCtx.items.length).fill(false))
  }, [todosCtx.items.length])
  const [formState, inputHandler] = useForm(
    {
      checkeds: [],
    },
    false
  )
  console.log(formState.inputs.checkeds)

  const clickDetailsHandler = (id) => {
    console.log(id)
    const updatedShowedDetails = showedDetails.map((item, index) =>
      index === id ? !item : item
    )
    setShowedDetails(updatedShowedDetails)
  }

  return (
    <WrapperTodoList>
      <StlNewTodo>
        <p>Todo List</p>
        <Input
          id='search'
          element='input'
          type='text'
          label=''
          placeholder='search ...'
          initialValid={true}
          onInput={() => {}}
        />
        {todosCtx.items
          .sort((indexA, indexB) => {
            const dueDateA = todosCtx.items[indexA]
            const dueDateB = todosCtx.items[indexB]
            return dueDateA > dueDateB ? -1 : 1
          })
          .map(({id, title, ...otherTodoProps}, index) => (
            <div key={index}>
              <StlAction>
                <div className='todo-title'>
                  <Input
                    id={`chk-${index}`}
                    element='input'
                    type='checkbox'
                    style={{marginRight: '1rem'}}
                    index={index}
                    onInput={inputHandler}
                    validators={[VALIDATOR_REQUIRE()]}
                  />
                  <span>{title}</span>
                </div>
                <div className='action__button'>
                  <Button
                    inverse={true}
                    onClick={() => clickDetailsHandler(index)}
                  >
                    Details
                  </Button>
                  <Button
                    danger={true}
                    onClick={todosCtx.removeTodo.bind(null, id)}
                  >
                    Remove
                  </Button>
                </div>
              </StlAction>
              {showedDetails[index] && (
                <TodoItem
                  id={id}
                  title={title}
                  {...otherTodoProps}
                  onRemoveTodo={todosCtx.removeTodo.bind(null, id)}
                />
              )}
            </div>
          ))}
      </StlNewTodo>
      {formState.inputs.checkeds.includes(true) && (
        <StlyBulkAction>
          <div className='todo-title'>
            <span>Bulk Action</span>
          </div>
          <div className='action__button'>
            <Button inverse={true} isBulkAction={true}>
              Done
            </Button>
            <Button danger={true}>Remove</Button>
          </div>
        </StlyBulkAction>
      )}
    </WrapperTodoList>
  )
}

export default TodoList
