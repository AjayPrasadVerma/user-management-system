import { useReducer } from "react";

const useInput = (validateValue) => {
  const initialInputState = {
    value: "",
    isTouched: false,
  };

  const inputStateReducer = (state, action) => {
    if (action.type === "INPUT") {
      return {
        value: action.value,
        isTouched: state.isTouched,
      };
    }
    if (action.type === "BLUR") {
      return {
        value: state.value,
        isTouched: true,
      };
    }
    if (action.type === "RESET") {
      return {
        value: "",
        isTouched: false,
      };
    }

    return {
      value: "",
      isTouched: false,
    };
  };

  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const showError = !valueIsValid && inputState.isTouched;

  const inputChangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const inputBlurHandler = () => {
    dispatch({ type: "BLUR" });
  };

  const resteValue = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError: showError,
    inputChangeHandler,
    inputBlurHandler,
    resteValue,
  };
};

export default useInput;
