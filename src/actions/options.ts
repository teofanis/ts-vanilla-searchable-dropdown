import { ACTIONS_TYPES } from "../constants";
import { ListOption } from "../interfaces";

export interface AddOptionAction {
    type: typeof ACTIONS_TYPES.ADD_OPTION;
    option: ListOption;
}

export interface FilterOptionAction {
    type: typeof ACTIONS_TYPES.FILTER_OPTION;
    filter: string;
}

export const addOption = (option: ListOption): AddOptionAction => ({
    type: ACTIONS_TYPES.ADD_OPTION,
    option,
});

export const filterOptions = (filter: string): FilterOptionAction => ({
    type: ACTIONS_TYPES.FILTER_OPTION,
    filter,
});
