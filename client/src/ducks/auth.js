import { takeEvery, call, put } from "redux-saga/effects";
import { appName } from "../config";
import { Record } from "immutable";
import apiService from "../services/api";
import { useSelector } from "react-redux";

/**
 * Constants
 * */
export const moduleName = "auth";
const prefix = `${appName}/${moduleName}`;

export const SIGN_UP_REQUEST = `${prefix}/SIGN_UP_REQUEST`;
export const SIGN_UP_START = `${prefix}/SIGN_UP_START`;
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`;
export const SIGN_UP_ERROR = `${prefix}/SIGN_UP_ERROR`;

export const AUTH_CHANGE = `${prefix}/AUTH_CHANGE`;

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  user: null,
  loading: false,
  error: null,
});

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload, error } = action;

  switch (type) {
    case SIGN_UP_START:
      return state.set("loading", true);

    case AUTH_CHANGE:
    case SIGN_UP_SUCCESS:
      return state
        .set("loading", false)
        .set("user", payload.user)
        .set("error", null);

    case SIGN_UP_ERROR:
      return state.set("error", error).set("loading", false);

    default:
      return state;
  }
}

/**
 * Selectors
 * */

export const userSelector = (state) => state[moduleName].user;

/**
 * Custom Hooks
 */

export const useAuthorized = () => {
  const user = useSelector(userSelector);

  return !!user;
};

/**
 * Action Creators
 * */

export const signUp = (email, password) => ({
  type: SIGN_UP_REQUEST,
  payload: { email, password },
});

/**
 * Sagas
 */

export const signUpSaga = function* ({ payload: { email, password } }) {
  yield put({
    type: SIGN_UP_START,
  });

  try {
    const user = yield call(apiService.signUp, email, password);

    yield put({
      type: SIGN_UP_SUCCESS,
      payload: { user },
    });
  } catch (error) {
    yield put({
      type: SIGN_UP_ERROR,
      error,
    });
  }
};

export const saga = function* () {
  yield takeEvery(SIGN_UP_REQUEST, signUpSaga);
};

/**
 * Init Logic
 */

export const init = (store) => {
  apiService.onAuthChange((user) => {
    store.dispatch({
      type: AUTH_CHANGE,
      payload: { user },
    });
  });
};
