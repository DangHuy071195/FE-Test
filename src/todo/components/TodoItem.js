import React, {useState, useContext} from 'react'
import styled from 'styled-components'
import Button from '../../shared/components/FormElements/Button'
import Input from '../../shared/components/FormElements/Input'
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators'
import useForm from '../../shared/hooks/form-hook'
import {TodosContext} from '../../store/todo-context'

const StlForm = styled.form`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: space-around;
  padding: 2.6rem;
  border: 1px solid black;
  border-top: none;
`
const StlFormGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* flex-grow: 1; */
  flex-wrap: wrap;
  div:first-of-type {
    flex-shrink: 1;
    /* padding-right: 1vw; */
  }
  > div {
    flex-grow: 1;
    flex-shrink: 0;
    max-width: calc(50% - 2rem);
    /* margin: 4rem; */
    select {
      height: 3.3rem;
      padding: 0.5rem;
      background-color: white;
      border: 1px solid black;
      width: 100%;
      &:focus {
        outline: none;
      }
    }
  }
`

const TodoItem = ({title, description, duedate, piority, onRemoveTodo, id}) => {
  const todosCtx = useContext(TodosContext)

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: title,
        isValid: true,
      },
      description: {
        value: description,
        isValid: true,
      },
      duedate: {
        value: duedate,
        isValid: true,
      },
      piority: {
        value: piority,
        isValid: true,
      },
    },
    false
  )

  const updateTodoSubmitHandler = (event) => {
    event.preventDefault()

    const {title, description, duedate, piority} = formState.inputs
    todosCtx.updateTodo({
      title: title.value,
      description: description.value,
      duedate: duedate.value,
      piority: piority.value,
      id: id,
    })
  }
  return (
    <>
      <StlForm onSubmit={updateTodoSubmitHandler}>
        <Input
          id='title'
          element='input'
          type='text'
          label=''
          initialvalue={formState.inputs.title.value}
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          initialValid={formState.inputs.title.isValid}
        />
        <Input
          id='description'
          element='textarea'
          label='Description'
          rows={6}
          initialvalue={formState.inputs.description.value}
          validators={[VALIDATOR_MINLENGTH(5)]}
          onInput={inputHandler}
          initialValid={formState.inputs.description.isValid}
        />
        <StlFormGroup>
          <Input
            id='duedate'
            element='input'
            type='date'
            label='DueDate'
            dataDate=''
            dataDateFormat='DD MMMM YYYY'
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            initialvalue={formState.inputs.duedate.value}
            initialValid={formState.inputs.duedate.isValid}
          />
          <Input
            id='piority'
            element='select'
            label='Piority'
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Choose a level'
          />
        </StlFormGroup>

        <Button type='submit' disabled={!formState.isValid}>
          Update
        </Button>
      </StlForm>
    </>
  )
}

export default TodoItem
