import { InstanceID } from './common';
import { ListOption } from './ListOption';
import { SearchableDropdownConfig } from './SearchableDropdownConfig';

export interface SearchableDropdownI {
  isSearching: boolean;
  isOpen: boolean;
  listHeight: string;
  placeholder: string;
  isClearable: boolean;
  selectedOption: ListOption | null;
  container: HTMLElement;
  listElement: HTMLElement;
  element: HTMLInputElement;
  config: Partial<SearchableDropdownConfig>;
  options: ListOption[];
  init(): void;
  isOptionSelected: (option: ListOption) => boolean;
  instanceID: InstanceID;
}
