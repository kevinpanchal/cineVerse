// Author - Roshil Ka Patel (B00917345)
import {
  ADD_FOOD_ITEM_FAIL,
  ADD_FOOD_ITEM_SUCCESS,
  CHANGE_ACTIVATION_STATE_FAIL,
  CHANGE_ACTIVATION_STATE_SUCCESS,
  GET_ALL_FOOD_ITEMS_FAIL,
  GET_ALL_FOOD_ITEMS_SUCCESS,
  GET_FOOD_ITEMS_FAIL,
  GET_FOOD_ITEMS_SUCCESS,
  SET_FOOD_LOADING,
  UPDATE_FOOD_ITEM_FAIL,
  UPDATE_FOOD_ITEM_SUCCESS,
} from "./actionTypes";

const initialState = {
  loading: false,
  foodItems: [],
  error: false,
  message: "",
};

const foodReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FOOD_LOADING:
      return {
        ...initialState,
        loading: true,
      };
    case GET_FOOD_ITEMS_SUCCESS:
    case GET_ALL_FOOD_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        foodItems: action.payload,
      };
    case GET_FOOD_ITEMS_FAIL:
    case GET_ALL_FOOD_ITEMS_FAIL:
      return {
        ...state,
        loading: false,
        foodItems: [],
        error: true,
        message: action.message,
      };
    case CHANGE_ACTIVATION_STATE_SUCCESS:
    case UPDATE_FOOD_ITEM_SUCCESS:
    case ADD_FOOD_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case CHANGE_ACTIVATION_STATE_FAIL:
    case ADD_FOOD_ITEM_FAIL:
    case UPDATE_FOOD_ITEM_FAIL:
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

export default foodReducer;
