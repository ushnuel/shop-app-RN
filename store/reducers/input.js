import { INPUT_CHANGE, INPUT_BLUR } from '../actions/actionTypes';

const inputChangeHandler = (state, action) => {
  return {
    ...state,
    value: action.value,
    isValid: action.isValid,
  };
};

const inputBlurHandler = (state) => {
  return {
    ...state,
    touched: true,
  };
};

const InputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return inputChangeHandler(state, action);
    case INPUT_BLUR:
      return inputBlurHandler(state);
    default:
      return state;
  }
};

export default InputReducer;
