import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import App from "./app";
import { initStore } from "./redux";
import history from "./history";
import "./mocks";

ReactDOM.render(
  <Provider store={initStore()}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
