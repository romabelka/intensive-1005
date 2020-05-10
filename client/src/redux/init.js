import { init as authInit } from "../ducks/auth";

export default (store) => {
  authInit(store);
};
