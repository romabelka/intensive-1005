import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import history from "../history";
import authReducer, { moduleName as authModule } from "../ducks/auth";
import eventsReducer, { moduleName as eventsModule } from "../ducks/events";

export default combineReducers({
  router: connectRouter(history),
  [authModule]: authReducer,
  [eventsModule]: eventsReducer,
});
