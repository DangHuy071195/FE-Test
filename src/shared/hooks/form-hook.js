import {useReducer, useCallback} from 'react'

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE': {
      let formIsValid = true

      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid
        }
      }
      return {
        ...state,

        inputs: {
          ...state.inputs,
          [action.inputId]: {value: action.value, isValid: action.isValid},
          checkeds: action.checkedState,
        },
        isValid: formIsValid,
      }
    }
    default:
      return state
  }
}

const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  })

  const inputHandler = useCallback((id, value, isValid, checkedState) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputId: id,
      checkedState: checkedState,
    })
  }, [])

  return [formState, inputHandler]
}

export default useForm
