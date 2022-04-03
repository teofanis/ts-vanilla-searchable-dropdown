import { AddOptionAction, AddOptionsAction, FilterOptionAction } from '../actions/options';
import { ACTIONS_TYPES } from '../constants';
import { ListOption } from '../interfaces';

export const defaultState = [];
type ActionType = AddOptionAction | AddOptionsAction | FilterOptionAction;

export default function options(state: ListOption[] = defaultState, action: ActionType) {
  switch (action.type) {
    case ACTIONS_TYPES.ADD_OPTION:
      // @ts-ignore
      return [...state, action.option];
    case ACTIONS_TYPES.ADD_OPTIONS:
      // @ts-ignore
      return [...state, ...action.options];
    case ACTIONS_TYPES.FILTER_OPTION:
      return [
        // @ts-ignore
        ...action.options.filter((option) =>
          // @ts-ignore
          option.label.includes(action.filter)
        ),
      ];
    default:
      return state;
  }
}
