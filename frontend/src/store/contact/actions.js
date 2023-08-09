import { ADD_CONTACT_REQUEST } from "./actionTypes";

export const addContactRequestAction = (data) => ({
  type: ADD_CONTACT_REQUEST,
  payload: data,
});
