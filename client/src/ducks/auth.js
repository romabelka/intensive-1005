import { all, call, fork, put, take, delay } from "redux-saga/effects";
import { appName } from "../config";
import { Record } from "immutable";
import apiService from "../services/api";
import { useSelector } from "react-redux";
import { eventChannel } from "redux-saga";

/**
 * Constants
 * */
export const moduleName = "auth";
const prefix = `${appName}/${moduleName}`;

export const SIGN_UP_REQUEST = `${prefix}/SIGN_UP_REQUEST`;
export const SIGN_UP_START = `${prefix}/SIGN_UP_START`;
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`;
export const SIGN_UP_ERROR = `${prefix}/SIGN_UP_ERROR`;
export const SIGN_UP_TIMEOUT_LIMIT = `${prefix}/SIGN_UP_TIMEOUT_LIMIT`;
export const SIGN_UP_HARD_LIMIT = `${prefix}/SIGN_UP_HARD_LIMIT`;

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

export const signUpSaga = function* () {
  let errorCount = 0;

  while (true) {
    if (errorCount === 3) {
      yield put({
        type: SIGN_UP_TIMEOUT_LIMIT,
      });

      yield delay(1000);
    } else if (errorCount >= 5) {
      yield put({
        type: SIGN_UP_HARD_LIMIT,
      });

      return;
    }

    const {
      payload: { email, password },
    } = yield take(SIGN_UP_REQUEST);

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
      errorCount++;

      yield put({
        type: SIGN_UP_ERROR,
        error,
      });
    }
  }
};

const authChangeChannel = () => eventChannel(apiService.onAuthChange);

export const init = function* () {
  const channel = yield call(authChangeChannel);

  while (true) {
    const user = yield take(channel);

    yield put({
      type: AUTH_CHANGE,
      payload: { user },
    });
  }
};

export const saga = function* () {
  yield fork(init);
  yield all([signUpSaga()]);
};
