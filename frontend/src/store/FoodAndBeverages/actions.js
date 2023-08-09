// Author - Roshil Ka Patel (B00917345)
import {
  ADD_FOOD_ITEM,
  CHANGE_ACTIVATION_STATE,
  DELETE_FOOD_ITEM,
  GET_ALL_FOOD_ITEMS,
  GET_FOOD_ITEMS,
  UPDATE_FOOD_ITEM,
} from "./actionTypes";

export const getFoodItemsAction = () => ({
  type: GET_FOOD_ITEMS,
});

export const getAllFoodItemsAction = () => ({
  type: GET_ALL_FOOD_ITEMS,
});

export const addFoodItemAction = (data, callback) => ({
  type: ADD_FOOD_ITEM,
  payload: data,
  callback,
});

export const updateFoodItemAction = (data, callback) => ({
  type: UPDATE_FOOD_ITEM,
  payload: data,
  callback,
});

export const deleteFoodItem = (id) => ({
  type: DELETE_FOOD_ITEM,
  id: id,
});

export const changeActivationStateAction = (state) => ({
  type: CHANGE_ACTIVATION_STATE,
  state: state,
});
