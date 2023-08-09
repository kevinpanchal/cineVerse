import {
  SET_USER_LOADING,
  SET_USER_SUCCESS,
  SET_USER_FAIL,
  REMOVE_USER_SUCCESS,
} from "./actionTypes";
import Cookies from "js-cookie";

const initialState = {
  loading: false,
  user: {},
  error: false,
  message: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_USER_SUCCESS:
      Cookies.set("token", action.payload.token);
      return {
        ...state,
        loading: false,
        user: { email: action.payload.email, name: action.payload.name, role: action.payload.role },
      };
    case SET_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.message,
      };
    case REMOVE_USER_SUCCESS:
      Cookies.remove("token");
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default authReducer;
