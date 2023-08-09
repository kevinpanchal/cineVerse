import { ADD_ITEM, CLEAR_CART, UPDATE_ITEM } from "./actions";

export const addItemAction = (itemDetails) => ({
  type: ADD_ITEM,
  payload: itemDetails,
});

export const updateItemAction = (itemDetails) => ({
  type: UPDATE_ITEM,
  payload: itemDetails,
});

export const clearCartAction = () => ({
  type: CLEAR_CART,
});
