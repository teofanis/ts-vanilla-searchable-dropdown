import { ActionType, SearchableDropdownConfig } from "../interfaces";

export const DEFAULT_CONFIG: SearchableDropdownConfig = {
  placeholder: "Select an option",
  name: "searchable-dropdown-input",
  listHeight: "250px",
  clearable: false,
  highlightMatches: false,
};

export const ACTIONS_TYPES: Record<ActionType, ActionType> = {
  ADD_OPTION: "ADD_OPTION",
  ADD_OPTIONS: "ADD_OPTIONS",
  RESET_STATE: "RESET_STATE",
  FILTER_OPTION: "FILTER_OPTION",
  SELECT_OPTION: "SELECT_OPTION",
};

export const CLASS_NAMES = {
  SEARCHABLE_DROPDOWN_CONTAINER: ["searchable-dropdown", "select-group"],
  SEARCHABLE_DROPDOWN_LIST: ["searchable-dropdown-list", "hidden"],
  SEARCHABLE_DROPDOWN_ITEM: ["searchable-dropdown-item"],
  SEARCHABLE_DROPDOWN_NO_RESULTS: ["searchable-dropdown-no-results"],
  SEARCHABLE_DROPDOWN_ITEM_LABEL: ["select-item"],
  SEARCHABLE_DROPDOWN_ITEM_INPUT: ["option"],
  SEARCHABLE_DROPDOWN_BUTTON: ["sb-button"],
  SEARCHABLE_DROPDOWN_BUTTON_LABEL: ["select-label"],
  SEARCHABLE_DROPDOWN_BUTTON_ARROW: ["arrow"],
  SEARCHABLE_DROPDOWN_CLEAR_BUTTON: ["clear-button"],
};
