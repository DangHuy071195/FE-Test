const VALIDATOR_TYPE_REQUIRE = 'REQUIRE'
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH'
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH'
const VALIDATOR_TYPE_MIN = 'MIN'
const VALIDATOR_TYPE_MAX = 'MAX'

export const VALIDATOR_REQUIRE = () => ({type: VALIDATOR_TYPE_REQUIRE})
export const VALIDATOR_MINLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val,
})
export const VALIDATOR_MAXLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: val,
})
export const VALIDATOR_MIN = (val) => ({type: VALIDATOR_TYPE_MIN, val: val})
export const VALIDATOR_MAX = (val) => ({type: VALIDATOR_TYPE_MAX, val: val})

export const validate = (value, validators) => {
  let isValid = true
  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      if (typeof value == 'boolean') {
        isValid = isValid && value
      } else {
        isValid = isValid && value.trim().length > 0
      }
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      isValid = isValid && value.trim().length >= validator.val
    }
    if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
      isValid = isValid && value.trim().length <= validator.val
    }
    if (validator.type === VALIDATOR_TYPE_MIN) {
      isValid = isValid && +value >= validator.val
    }
    if (validator.type === VALIDATOR_TYPE_MAX) {
      isValid = isValid && +value <= validator.val
    }
  }
  return isValid
}
