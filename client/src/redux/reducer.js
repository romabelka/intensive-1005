import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import history from "../history";
import authReducer, { moduleName as authModule } from "../ducks/auth";

export default combineReducers({
  router: connectRouter(history),
  [authModule]: authReducer,
});
