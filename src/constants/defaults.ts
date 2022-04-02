import { ActionType, SearchableDropdownConfig } from '../interfaces';

export const DEFAULT_CONFIG: SearchableDropdownConfig = {
  label: null,
  placeholder: 'Searchable Placeholder',
  name: 'searchable-dropdown-input',
};

export const ACTIONS_TYPES: Record<ActionType, ActionType> = {
  ADD_OPTION: 'ADD_OPTION',
  RESET_STATE: 'RESET_STATE',
}
