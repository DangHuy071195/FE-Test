import React, {useReducer, useEffect, useRef} from 'react'
import styled from 'styled-components'
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
    background: url('../../../assets/calendar.svg') no-repeat center center;
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
        isValid: validate(action.val, action.validators) && action.isChecked,
        dataDate: action.dataDate,
        isChecked: action.isChecked,
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
  const [inputState, dispatch] = useReducer(inputReducer, {
    dataDate: props.initialDataDate || formatDate(new Date()),
    value: props.initialvalue || '',
    isTouched: false,
    isValid: props.initialValid || false,
    isChecked: false,
  })

  const {id, onInput} = props
  const {value, isValid, isChecked} = inputState

  useEffect(() => {
    onInput(id, value, isValid, isChecked)
  }, [id, value, isValid, onInput, isChecked])

  const changeHandler = (event) => {
    console.log('isChecked' + event.target.checked)
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
    })
  }

  const touchHandler = () => {
    dispatch({type: 'TOUCH'})
  }
  const element =
    props.element === 'input' ? (
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
