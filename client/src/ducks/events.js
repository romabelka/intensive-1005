import { appName } from "../config";
import { OrderedMap, Record } from "immutable";
import {
  put,
  call,
  takeEvery,
  all,
  delay,
  fork,
  take,
} from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import apiService from "../services/api";

/**
 * Constants
 * */
export const moduleName = "events";
const prefix = `${appName}/${moduleName}`;

export const FETCH_EVENTS_REQUEST = `${prefix}/FETCH_EVENTS_REQUEST`;
export const FETCH_EVENTS_SUCCESS = `${prefix}/FETCH_EVENTS_SUCCESS`;

export const SYNC_EVENTS_SUCCESS = `${prefix}/SYNC_EVENTS_SUCCESS`;

export const ADD_EVENT_REQUEST = `${prefix}/ADD_EVENT_REQUEST`;
export const ADD_EVENT = `${prefix}/ADD_EVENT`;

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  entities: new OrderedMap(),
  loading: false,
  loaded: false,
});

const EventRecord = Record({
  id: null,
  title: "",
  url: "",
  where: "",
  when: "",
  month: "",
  submissionDeadline: "",
});

const arrToMap = (arr) => {
  const map = arr.reduce((acc, el) => {
    acc[el.id] = new EventRecord(el);
    return acc;
  }, {});

  return new OrderedMap(map);
};

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_EVENT:
      return state.setIn(["entities", payload.id], new EventRecord(payload));

    case SYNC_EVENTS_SUCCESS:
    case FETCH_EVENTS_SUCCESS:
      return state.set("entities", arrToMap(payload.events));

    default:
      return state;
  }
}

/**
 * Selectors
 * */

export const eventListSelector = (state) =>
  state[moduleName].entities
    .valueSeq()
    .toArray()
    .sort((a, b) => (a.title < b.title ? -1 : 1));

/**
 * Action Creators
 * */

export const createEvent = (event) => ({
  type: ADD_EVENT_REQUEST,
  payload: event,
});

export const fetchEvents = () => ({
  type: FETCH_EVENTS_REQUEST,
});

/**
 * Sagas
 * */

export const addEventSaga = function* ({ payload }) {
  console.log("---", 123, payload);
  yield call(apiService.addEvent, payload);
};

export const fetchEventsWithRetrySaga = function* () {
  yield call(retryExp, fetchEventsSaga);
};

export const fetchEventsSaga = function* () {
  const events = yield call(apiService.fetchEvents);

  yield put({
    type: FETCH_EVENTS_SUCCESS,
    payload: { events },
  });
};

export const retryExp = function* (saga) {
  const baseTimeout = 10;
  for (let i = 1; i < 5; i++) {
    try {
      console.log("---", "attempt ", i);
      return yield call(saga);
    } catch (error) {
      console.log(error, "timeout", baseTimeout ** i);
      yield delay(baseTimeout ** i);
    }
  }
};

export const syncEventsPolling = function* () {
  while (true) {
    yield fork(fetchEventsSaga);
    yield delay(5000);
  }
};

const createEventChanel = () => eventChannel(apiService.onEventsChange);

export const syncEvents = function* () {
  const chanel = yield call(createEventChanel);

  while (true) {
    const events = yield take(chanel);

    yield put({
      type: SYNC_EVENTS_SUCCESS,
      payload: { events },
    });
  }
};

export const saga = function* () {
  yield fork(syncEvents);
  yield all([takeEvery(ADD_EVENT_REQUEST, addEventSaga)]);
};
