const initialState = {
  error: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "ERROR_SET":
      return {
        error: action.payload
      }
    default:
      return state;
  }
}
