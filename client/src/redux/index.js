import { createStore, applyMiddleware } from "redux";
import { routerMiddleware } from "connected-react-router";
import logger from "redux-logger";
import thunk from "redux-thunk";
import reducer from "./reducer";
import history from "../history";

const enhancer = applyMiddleware(thunk, routerMiddleware(history), logger);

export default createStore(reducer, enhancer);
