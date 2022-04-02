import { AddOptionAction, FilterOptionAction } from "../actions/options";
import { ACTIONS_TYPES } from "../constants";
import { ListOption } from "../interfaces";

export const defaultState = [];
type ActionType = AddOptionAction | FilterOptionAction;


export default function options(
    state: ListOption[] = defaultState,
    action: ActionType
) {
    switch (action.type) {
        case ACTIONS_TYPES.ADD_OPTION:
            //@ts-ignore
            return [...state, action.option];
        case ACTIONS_TYPES.FILTER_OPTION:
            //@ts-ignore
            return [...state].filter(option => option.label.includes(action.filter));
        default:
            return state;
    }
}
