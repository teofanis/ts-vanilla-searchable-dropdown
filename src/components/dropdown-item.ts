import { ListOption, SearchableDropdownI } from "../interfaces";
import { createElement, data_get, highlight } from "../utils";
import { CLASS_NAMES, DEFAULT_CONFIG } from "./../constants/defaults";

export function dropdownItem(
  option: ListOption,
  instance: SearchableDropdownI
) {
  const classes = [
    ...CLASS_NAMES.SEARCHABLE_DROPDOWN_ITEM,
    ...[instance.isOptionSelected(option) ? "selected" : ""],
  ].filter(Boolean);
  const instanceID = instance.instanceID;
  const container = createElement("div", {
    class: classes,
    dataset: option,
    tabindex: 0,
  });
  const id = `${instanceID}-${option.label}-${option.value}-item`;
  const name = data_get(instance.config, "name", DEFAULT_CONFIG.name);

  let labelText = option.label;
  if (instance.isSearching && instance.highlightMatches) {
    labelText = `<span>${highlight(labelText, instance.searchTerm)}</span>`;
  }

  const labelElement = label(labelText, id);
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
    html: labelText,
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
