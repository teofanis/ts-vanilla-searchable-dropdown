import { ACTIONS_TYPES } from '../constants';
import { ListOption } from '../interfaces';
import { SelectOptionAction } from './../actions/options';

export const defaultState = null;
type ActionType = SelectOptionAction;

export default function selectOption(state: ListOption | null = defaultState, action: ActionType) {
  switch (action.type) {
    case ACTIONS_TYPES.SELECT_OPTION:
      return action.option;
    default:
      return state;
  }
}
