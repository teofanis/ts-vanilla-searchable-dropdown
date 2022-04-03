import { ListOption, SearchableDropdownI } from "../interfaces";
import { createElement, data_get } from "../utils";
import { CLASS_NAMES, DEFAULT_CONFIG } from "./../constants/defaults";

export function dropdownItem(
  option: ListOption,
  instance: SearchableDropdownI
) {
  const instanceID = instance.instanceID;
  const container = createElement("div", {
    class: CLASS_NAMES.SEARCHABLE_DROPDOWN_ITEM,
    dataset: option,
    tabindex: 0,
  });
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
  return createElement("label", {
    for: forAttribute,
    text: labelText,
    class: CLASS_NAMES.SEARCHABLE_DROPDOWN_ITEM_LABEL,
  }) as HTMLLabelElement;
}

export function input(
  value: string,
  id: string,
  name: string
): HTMLInputElement {
  return createElement("input", {
    id,
    type: "radio",
    name,
    value,
    class: CLASS_NAMES.SEARCHABLE_DROPDOWN_ITEM_INPUT,
  }) as HTMLInputElement;
}
