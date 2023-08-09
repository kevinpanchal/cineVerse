import { put, takeLatest } from "redux-saga/effects";
import {
  ADD_CONTACT_REQUEST,
  ADD_CONTACT_REQUEST_FAIL,
  ADD_CONTACT_REQUEST_SUCCESS,
  SET_CONTACT_LOADING,
} from "./actionTypes";
import axios from "../../utils/axios";
import { toast } from "react-toastify";

function* addContactSaga({ payload }) {
  try {
    yield put({ type: SET_CONTACT_LOADING });
    const { data } = yield axios.post("/contact/save", payload);
    if (data.success) {
      yield put({ type: ADD_CONTACT_REQUEST_SUCCESS, payload: data.data.message });
      toast.success(data.data.message);
    } else {
      yield put({ type: ADD_CONTACT_REQUEST_FAIL, message: data.data.message });
      toast.error(data.data.message);
    }
  } catch (error) {
    try {
      toast.error(error?.response?.data?.data?.message || "Something went wrong.");
      yield put({
        type: ADD_CONTACT_REQUEST_FAIL,
        message: error?.response?.data?.data?.message || "Something went wrong.",
      });
    } catch (error) {
      console.log(error);
    }
  }
}

function* contactSaga() {
  yield takeLatest(ADD_CONTACT_REQUEST, addContactSaga);
}

export default contactSaga;
