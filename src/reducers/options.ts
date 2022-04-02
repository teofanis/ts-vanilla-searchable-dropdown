import { AddOptionAction } from "../actions/options";
import { ListOption } from "../interfaces";

export const defaultState = [];
type ActionType = AddOptionAction;


export default function options(
    state: ListOption[] = defaultState,
    action: ActionType
) {
    switch (action.type) {
        case "ADD_OPTION":
            return [...state, action.option];
        default:
            return state;
    }
}
