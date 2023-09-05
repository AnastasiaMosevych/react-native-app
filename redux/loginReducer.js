import { LOGIN } from "./action";

const initialState = {
    email: null
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
    case LOGIN: {
    //   const { email } = action.payload
        return {
        ...state,
        email: action.payload,
      };
    }
    default:
      return state;
  }
}

export default loginReducer;