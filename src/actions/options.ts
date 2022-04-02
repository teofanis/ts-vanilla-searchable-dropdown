import { ACTIONS_TYPES } from "../constants";
import { ListOption } from "../interfaces";

export interface AddOptionAction {
    type: typeof ACTIONS_TYPES.ADD_OPTION;
    option: ListOption;
}

export const addOption = (option: ListOption): AddOptionAction => ({
    type: ACTIONS_TYPES.ADD_OPTION,
    option,
});
