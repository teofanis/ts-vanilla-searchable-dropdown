import { combineReducers } from "redux";
import { ACTIONS_TYPES } from "../constants";
import options from "./options";
import selected from "./selected";

export const defaultState = {
  selected: null,
  options: [],
};

const appReducer = combineReducers({
  options,
  selected,
});

//@ts-ignore
const rootReducer = (state, action): object => {
  if (action.type === ACTIONS_TYPES.RESET_STATE) {
    state = defaultState;
  }
  return appReducer(state, action);
};

export default rootReducer;
