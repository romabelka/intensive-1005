import { all } from "redux-saga/effects";
import { saga as eventSaga } from "../ducks/events";

export default function* () {
  yield all([eventSaga()]);
}
