import React, {useContext} from 'react'
import {TodosContext} from '../../store/todo-context'
import styled from 'styled-components'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import useForm from '../../shared/hooks/form-hook'
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators'

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
      font-size: calc(1.6rem + 1vw);
    }
  }
  button {
    margin-top: 6.5rem;
  }
`

const StlForm = styled.form`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: flex-start;
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

const NewTodo = () => {
  const todosCtx = useContext(TodosContext)

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      duedate: {
        value: '',
        isValid: false,
      },
      piority: {
        value: '',
        isValid: false,
      },
    },
    false
  )
  const addTodoSubmitHandler = (event) => {
    const {title, description, duedate, piority} = formState.inputs
    event.preventDefault()
    todosCtx.addTodo({
      title: title.value,
      description: description.value,
      duedate: duedate.value,
      piority: piority.value,
    })
  }
  return (
    <StlNewTodo>
      <p>New Task</p>
      <StlForm onSubmit={addTodoSubmitHandler}>
        <Input
          id='title'
          element='input'
          type='text'
          label=''
          placeholder='Add new task...'
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Enter title task '
        />
        <Input
          id='description'
          element='textarea'
          label='Description'
          rows={6}
          onInput={inputHandler}
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText='Please enter at least 5 characters'
        />
        <StlFormGroup>
          <Input
            id='duedate'
            element='input'
            type='date'
            dataDate=''
            dataDateFormat='DD MMMM YYYY'
            label='DueDate'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid'
            onInput={inputHandler}
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
          Add
        </Button>
      </StlForm>
    </StlNewTodo>
  )
}

export default NewTodo
