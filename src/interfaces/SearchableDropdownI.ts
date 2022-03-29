import { InstanceID } from "./common";
import { ListOption } from "./ListOption";
import { SearchableDropdownConfig } from "./SearchableDropdownConfig";

export interface SearchableDropdownI {
  element: HTMLInputElement;
  config: Partial<SearchableDropdownConfig>;
  options: ListOption[];
  init(): void;
  instanceID: InstanceID;
}
