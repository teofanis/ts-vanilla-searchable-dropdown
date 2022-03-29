import { SearchableDropdownI } from "../interfaces";

export function container(instance: SearchableDropdownI): HTMLDivElement {
  const container = document.createElement("div");
  container.classList.add("searchable-dropdown", "select-group"); // use some constant for these
  return container;
}
