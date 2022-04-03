import { CLASS_NAMES } from "../constants";
import { ListOption, SearchableDropdownI } from "../interfaces";
import { createElement } from "../utils";
import { dropdownItem } from "./dropdown-item";

export function dropdown(
  options: ListOption[],
  instance: SearchableDropdownI
): HTMLElement {
  const container = createElement("div", {
    id: instance.instanceID,
    class: CLASS_NAMES.SEARCHABLE_DROPDOWN_LIST.filter(
      (className) => !(className === "hidden" && instance.isOpen)
    ),
  });

  options.forEach((option) => {
    container.appendChild(dropdownItem(option, instance));
  });

  if (options.length === 0 && instance.isSearching) {
    const noResults = createElement("div", {
      class: CLASS_NAMES.SEARCHABLE_DROPDOWN_NO_RESULTS,
      text: "No results found",
    });
    container.appendChild(noResults);
  }

  return container;
}
