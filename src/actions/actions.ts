import { ACTIONS_TYPES } from '../constants';

export interface ResetAllAction {
  type: typeof ACTIONS_TYPES.RESET_STATE;
}

export const resetAll = (): ResetAllAction => ({ type: ACTIONS_TYPES.RESET_STATE });
