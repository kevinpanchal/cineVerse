import {
  SET_CONTACT_LOADING,
  ADD_CONTACT_REQUEST_SUCCESS,
  ADD_CONTACT_REQUEST_FAIL,
} from "./actionTypes";

const initialState = {
  loading: false,
  error: false,
  message: "",
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTACT_LOADING:
      return {
        ...initialState,
        loading: true,
      };
    case ADD_CONTACT_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case ADD_CONTACT_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.message,
      };
    default:
      return state;
  }
};

export default contactReducer;
