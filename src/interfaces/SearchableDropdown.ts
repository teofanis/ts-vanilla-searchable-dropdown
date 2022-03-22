import { SearchableDropdownConfig } from "./SearchableDropdownConfig";

export interface SearchableDropdown {
  element: HTMLInputElement;
  config: SearchableDropdownConfig;
  init(): void;
}
