import { REMOVE_USER, SET_USER } from "./actionTypes";

export const setUserAction = (data) => ({
  type: SET_USER,
  payload: data,
});

export const removeUserAction = () => ({
  type: REMOVE_USER,
});
