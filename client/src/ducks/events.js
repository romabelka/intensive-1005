import { appName } from "../config";
import { OrderedMap, Record } from "immutable";
import { v4 as uuid } from "uuid";

/**
 * Constants
 * */
export const moduleName = "events";
const prefix = `${appName}/${moduleName}`;

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

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_EVENT:
      return state.setIn(["entities", payload.id], payload);

    default:
      return state;
  }
}

/**
 * Selectors
 * */

/**
 * Action Creators
 * */

export const createEvent = (event) => (dispatch) =>
  dispatch({
    type: ADD_EVENT,
    payload: {
      id: uuid(),
      ...event,
    },
  });

/**
 * Sagas
 * */
