import { spawn } from "redux-saga/effects";
import { saga as eventSaga } from "../ducks/events";
import { saga as authSaga } from "../ducks/auth";

export default function* () {
  yield spawn(authSaga);
  yield spawn(eventSaga);
}
