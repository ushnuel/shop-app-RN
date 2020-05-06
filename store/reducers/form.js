import { FORM_INPUT_REDUCER } from '../actions/actionTypes';

const updateFormState = (state, action) => {
  const updatedInputValues = {
    ...state.inputValues,
    [action.input]: action.value,
  };
  const updateInputValidities = {
    ...state.inputValidites,
    [action.input]: action.isValid,
  };
  let formInputIsValid = true;

  for (let key in updateInputValidities) {
    formInputIsValid = formInputIsValid && updateInputValidities[key];
  }
  return {
    formValidity: formInputIsValid,
    inputValidites: updateInputValidities,
    inputValues: updatedInputValues,
  };
};

const FormReducer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_REDUCER:
      return updateFormState(state, action);

    default:
      return state;
  }
};

export default FormReducer;
