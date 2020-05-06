const FORM_INPUT_REDUCER = 'FORM_INPUT_REDUCER';

const formInputReducer = (state, action) => {
  if (action.type === FORM_INPUT_REDUCER) {
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
  }
};

export default formInputReducer;
