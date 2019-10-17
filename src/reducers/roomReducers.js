let initialState = {
  buttonDisable: false,
}

let roomReducer = (state = initialState, action) => {
  if (action.type === "DISABLE_BUTTON") {
    return {
      ...state,
      buttonDisable: true,
    }
  }
  return state;
}

export default roomReducer;