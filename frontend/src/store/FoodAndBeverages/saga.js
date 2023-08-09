// Author - Roshil Ka Patel (B00917345)
import { put, takeLatest, all } from "redux-saga/effects";
import {
  ADD_FOOD_ITEM,
  ADD_FOOD_ITEM_FAIL,
  ADD_FOOD_ITEM_SUCCESS,
  CHANGE_ACTIVATION_STATE,
  CHANGE_ACTIVATION_STATE_FAIL,
  CHANGE_ACTIVATION_STATE_SUCCESS,
  DELETE_FOOD_ITEM,
  DELETE_FOOD_ITEM_FAIL,
  DELETE_FOOD_ITEM_SUCCESS,
  GET_ALL_FOOD_ITEMS,
  GET_ALL_FOOD_ITEMS_FAIL,
  GET_ALL_FOOD_ITEMS_SUCCESS,
  GET_FOOD_ITEMS,
  GET_FOOD_ITEMS_FAIL,
  GET_FOOD_ITEMS_SUCCESS,
  SET_FOOD_LOADING,
  UPDATE_FOOD_ITEM,
  UPDATE_FOOD_ITEM_FAIL,
  UPDATE_FOOD_ITEM_SUCCESS,
} from "./actionTypes";
import axios from "../../utils/axios";
import { toast } from "react-toastify";

function* getFoodItemsSaga() {
  try {
    yield put({ type: SET_FOOD_LOADING });
    const { data } = yield axios.get("/foodAndBeverages/getAll");
    if (data.success) {
      yield put({ type: GET_FOOD_ITEMS_SUCCESS, payload: data.data });
    } else {
      yield put({ type: GET_FOOD_ITEMS_FAIL, message: data.message });
    }
  } catch (error) {
    yield put({ type: GET_FOOD_ITEMS_FAIL, message: "Something went wrong." });
  }
}

function* getAllFoodItemsSaga() {
  try {
    yield put({ type: SET_FOOD_LOADING });
    const { data } = yield axios.get("/admin/foodAndBeverages/getItems");
    if (data.success) {
      yield put({ type: GET_ALL_FOOD_ITEMS_SUCCESS, payload: data.data });
    } else {
      yield put({ type: GET_ALL_FOOD_ITEMS_FAIL, message: data.message });
    }
  } catch (error) {
    yield put({ type: GET_ALL_FOOD_ITEMS_FAIL, message: "Something went wrong." });
  }
}

function* changeActivationStateSaga({ state }) {
  try {
    yield put({ type: SET_FOOD_LOADING });
    const { data } = yield axios.put("/admin/foodAndBeverages/chageItemStatus", state);
    if (data.success) {
      yield put({ type: CHANGE_ACTIVATION_STATE_SUCCESS, payload: data.data });
      yield put({ type: GET_ALL_FOOD_ITEMS });
    } else {
      yield put({ type: CHANGE_ACTIVATION_STATE_FAIL, message: data.message });
    }
  } catch (error) {
    yield put({ type: CHANGE_ACTIVATION_STATE_FAIL, message: "Something went wrong." });
  }
}

function* addFoodItemSaga({ payload, callback }) {
  try {
    yield put({ type: SET_FOOD_LOADING });
    const { data } = yield axios.post("/admin/foodAndBeverages/addItem", payload);
    if (data.success) {
      yield put({ type: ADD_FOOD_ITEM_SUCCESS, payload: data.data });
      yield put({ type: GET_ALL_FOOD_ITEMS });
      callback();
      toast.success(data.data.message);
    } else {
      yield put({ type: ADD_FOOD_ITEM_FAIL, message: data.message });
    }
  } catch (error) {
    yield put({ type: ADD_FOOD_ITEM_FAIL, message: "Something went wrong." });
  }
}

function* updateFoodItemSaga({ payload, callback }) {
  try {
    yield put({ type: SET_FOOD_LOADING });
    const { data } = yield axios.put("/admin/foodAndBeverages/updateItem", payload);
    if (data.success) {
      yield put({ type: UPDATE_FOOD_ITEM_SUCCESS, payload: data.data });
      yield put({ type: GET_ALL_FOOD_ITEMS });
      callback();
      toast.success(data.data.message);
    } else {
      yield put({ type: UPDATE_FOOD_ITEM_FAIL, message: data.message });
    }
  } catch (error) {
    yield put({ type: UPDATE_FOOD_ITEM_FAIL, message: "Something went wrong." });
  }
}

function* deleteFoodItemSaga({ id }) {
  try {
    yield put({ type: SET_FOOD_LOADING });
    const { data } = yield axios.delete(`/admin/foodAndBeverages/deleteItem/${id}`);
    if (data.success) {
      yield put({ type: DELETE_FOOD_ITEM_SUCCESS, payload: data.data });
      yield put({ type: GET_ALL_FOOD_ITEMS });
      toast.success(data.data.message);
    } else {
      yield put({ type: DELETE_FOOD_ITEM_FAIL, message: data.message });
    }
  } catch (error) {
    yield put({ type: DELETE_FOOD_ITEM_FAIL, message: "Something went wrong." });
  }
}

function* foodSaga() {
  yield all([
    yield takeLatest(GET_FOOD_ITEMS, getFoodItemsSaga),
    yield takeLatest(GET_ALL_FOOD_ITEMS, getAllFoodItemsSaga),
    yield takeLatest(CHANGE_ACTIVATION_STATE, changeActivationStateSaga),
    yield takeLatest(DELETE_FOOD_ITEM, deleteFoodItemSaga),
    yield takeLatest(ADD_FOOD_ITEM, addFoodItemSaga),
    yield takeLatest(UPDATE_FOOD_ITEM, updateFoodItemSaga),
  ]);
}

export default foodSaga;
