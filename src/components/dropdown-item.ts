import { ListOption, SearchableDropdownI } from "../interfaces";
import { data_get } from "../utils";
import { DEFAULT_CONFIG } from "./../constants/defaults";

export function dropdownItem(
  option: ListOption,
  instance: SearchableDropdownI
) {
  const container = document.createElement("div");
  container.classList.add("searchable-dropdown-item");
  const instanceID = instance.instanceID;
  const id = `${instanceID}-${option.label}-${option.value}-item`;
  const name = data_get(instance.config, "name", DEFAULT_CONFIG.name);
  const labelElement = label(option.label, id);
  const inputElement = input(option.value, id, name);
  container.appendChild(inputElement);
  container.appendChild(labelElement);
  return container;
}

export function label(
  labelText: string,
  forAttribute: string
): HTMLLabelElement {
  const label = document.createElement("label");
  label.classList.add("select-item");
  label.textContent = labelText;
  label.setAttribute("for", forAttribute);
  return label;
}

export function input(
  value: string,
  id: string,
  name: string
): HTMLInputElement {
  const input = document.createElement("input");
  input.type = "radio";
  input.id = id;
  input.name = name;
  input.value = value;
  input.classList.add("option");
  return input;
}
