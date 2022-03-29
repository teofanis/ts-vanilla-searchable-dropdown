import { ListOption, SearchableDropdownI } from "../interfaces";
import { dropdownItem } from "./dropdown-item";

export function dropdown(
  options: ListOption[],
  instance: SearchableDropdownI
): HTMLDivElement {
  const container = document.createElement("div");
  container.id = instance.instanceID;
  container.classList.add("searchable-dropdown-list", "hidden"); // use some constant for these
  options.forEach((option) => {
    container.appendChild(dropdownItem(option, instance));
  });
  return container;
}
