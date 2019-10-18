let initialState = {
  buttonDisable: false,
}

let roomReducer = (state = initialState, action) => {
  if (action.type === "DISABLE_BUTTON") {
    return {
      ...state,
      buttonDisable: true,
    }
  } else if (action.type === "ENABLE_BUTTON") {
    return {
      ...state,
      buttonDisable: false,
    }
  }
  return state;
}

export default roomReducer;