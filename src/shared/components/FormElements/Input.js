import React, {useReducer, useEffect, useState, useContext} from 'react'
import styled from 'styled-components'
import {TodosContext} from '../../../store/todo-context'
import {formatDate} from '../../util/date-format'
import {validate} from '../../util/validators'

const StlFormControl = styled.div`
  margin-top: ${({isCheckBox}) => (isCheckBox ? 0 : '2.5rem')};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  position: relative;
  label {
    display: block;
    margin-bottom: 1rem;
    font-size: calc(1.2rem + 0.5vw);

    @media screen and (min-width: 1440px) {
      font-size: calc(1.2rem + 0.5vw);
    }
  }

  input[type='date'] {
    position: relative;

    &:before {
      position: absolute;
      left: 15px;
      top: 6px;
      content: attr(data-date);
      display: inline-block;
      color: black;
    }
    &:after {
      content: '';
      position: absolute;
      top: 0;
      right: 3rem;
      width: 1px;
      height: 100%;
      background-color: black;
    }
  }
  input[type='date']::-webkit-datetime-edit,
  input[type='date']::-webkit-inner-spin-button,
  input[type='date']::-webkit-clear-button {
    display: none;
  }
  input[type='date']::-webkit-calendar-picker-indicator {
    position: absolute;
    top: 3px;
    right: 3px;
    color: black;
    opacity: 1;
  }
  input[type='date']::-webkit-inner-spin-button,
  input[type='date']::-webkit-calendar-picker-indicator {
    /* display: none; */
    background: transparent
      url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTUgMHYxaDhWMGgxdjFoMmEyIDIgMCAwMTIgMnYxNGEyIDIgMCAwMS0yIDJIMmEyIDIgMCAwMS0yLTJWM2EyIDIgMCAwMTItMmgyVjBoMXptMTIgN0gxdjEwYTEgMSAwIDAwMSAxaDE0YTEgMSAwIDAwMS0xVjd6TTQgMTZ2MUgydi0xaDJ6bTMgMHYxSDV2LTFoMnptMyAwdjFIOHYtMWgyem0tNi0ydjFIMnYtMWgyem0zIDB2MUg1di0xaDJ6bTMgMHYxSDh2LTFoMnptMyAwdjFoLTJ2LTFoMnptMyAwdjFoLTJ2LTFoMnpNNCAxMnYxSDJ2LTFoMnptMyAwdjFINXYtMWgyem0zIDB2MUg4di0xaDJ6bTMgMHYxaC0ydi0xaDJ6bTMgMHYxaC0ydi0xaDJ6TTQgMTB2MUgydi0xaDJ6bTMgMHYxSDV2LTFoMnptMyAwdjFIOHYtMWgyem0zIDB2MWgtMnYtMWgyem0zIDB2MWgtMnYtMWgyek03IDh2MUg1VjhoMnptMyAwdjFIOFY4aDJ6bTMgMHYxaC0yVjhoMnptMyAwdjFoLTJWOGgyek00IDJIMmExIDEgMCAwMC0xIDF2M2gxNlYzYTEgMSAwIDAwLTEtMWgtMnYzaC0xVjJINXYzSDRWMnoiIGZpbGw9IiNBMEFFQzAiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')
      no-repeat center center;
    -webkit-appearance: none;
  }

  input,
  textarea {
    width: 100%;
    padding: 1rem;
    border: 1px solid #505050;
    &:focus {
      outline: none;
    }
  }
  input {
    height: 3.3rem;
    font-size: calc(1.2rem + 0.5vw);

    @media screen and (min-width: 1440px) {
      font-size: calc(1.2rem + 0.5vw);
    }
  }
  &.form-control--invalid {
    input,
    textarea {
      border: 1px solid #d93a26;
    }
  }
  &:after {
    position: absolute;
    content: ${({isValid, isTouched, errorText}) => {
      return !isValid && isTouched ? `'!  ${errorText}'` : 'sadas'
    }};
    width: 200px;
    height: 20px;
    bottom: -2.3rem;
    left: 0;
    z-index: 99;
    color: #d93025;
  }
`

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
        dataDate: action.dataDate,
        isChecked: action.isChecked,
        index: action.index,
      }
    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      }
    default:
      return state
  }
}

const Input = (props) => {
  const todosCtx = useContext(TodosContext)
  const [checkedState, setCheckedState] = useState([])

  useEffect(() => {
    setCheckedState(new Array(todosCtx.items.length).fill(false))
  }, [todosCtx.items.length])
  const [inputState, dispatch] = useReducer(inputReducer, {
    dataDate: props.initialDataDate || formatDate(new Date()),
    value: props.initialvalue || '',
    isTouched: false,
    isValid: props.initialValid || false,
  })

  const {id, onInput} = props
  const {value, isValid} = inputState
  useEffect(() => {
    onInput(id, value, isValid, checkedState)
  }, [id, value, isValid, onInput, checkedState])

  const changeHandlerChecked = (pos) => {
    console.log(pos, checkedState[pos])

    setCheckedState((prevState) => {
      return prevState.map((item, index) => {
        console.log(index)
        return index === pos ? !item : item
      })
    })
    // console.log(checkedState[0])
  }

  const changeHandler = (event) => {
    console.log('isChecked' + event.target.checked + props.index)
    const valDate = event.target.value
    dispatch({
      type: 'CHANGE',
      val:
        props.type === 'checkbox' ? event.target.checked : event.target.value,
      validators: props.validators,
      isChecked: props.type === 'checkbox' ? event.target.checked : true,
      dataDate:
        props.type === 'date'
          ? formatDate(
              new Date(
                valDate.split('-')[0],
                valDate.split('-')[1] - 1,
                valDate.split('-')[2]
              )
            )
          : '',
      index: props.index,
    })
  }

  const touchHandler = () => {
    dispatch({type: 'TOUCH'})
  }
  const {index} = props
  const element =
    props.element === 'input' && props.type !== 'checkbox' ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        data-date={inputState.dataDate}
        data-date-format={props.dataDateFormat}
      />
    ) : props.type === 'checkbox' && props.element === 'input' ? (
      <input
        id={props.id}
        type={props.type}
        onChange={() => changeHandlerChecked(index)}
        onBlur={touchHandler}
        index={index}
        checked={checkedState[index] || false}
      />
    ) : props.element === 'select' ? (
      <select
        id={props.id}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      >
        <option value='0'>Choose type</option>
        <option value='1'>Low</option>
        <option value='2'>Normal</option>
        <option value='3'>High</option>
      </select>
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    )

  return (
    <StlFormControl
      isValid={inputState.isValid}
      isTouched={inputState.isTouched}
      errorText={props.errorText}
      isCheckBox={props.type === 'checkbox'}
      className={`${
        !inputState.isValid && inputState.isTouched && 'form-control--invalid'
      }`}
    >
      {props.label && <label htmlFor={props.id}>{props.label}</label>}

      {element}
    </StlFormControl>
  )
}

export default Input
