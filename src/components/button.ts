import { SearchableDropdownI } from "../interfaces";
import { createElement } from "../utils";
import { CLASS_NAMES } from "./../constants/defaults";

export function button(instance: SearchableDropdownI): HTMLElement {
  const button = createElement("button", {
    class: CLASS_NAMES.SEARCHABLE_DROPDOWN_BUTTON,
  });

  const span = createElement("span", {
    text: instance.selectedOption?.value ?? instance.placeholder,
    class: CLASS_NAMES.SEARCHABLE_DROPDOWN_BUTTON_LABEL,
  });

  const arrowEl = arrow(instance);
  button.appendChild(span);
  button.appendChild(arrowEl);
  return button;
}

export function arrow(instance: SearchableDropdownI): HTMLElement {
  let classes = CLASS_NAMES.SEARCHABLE_DROPDOWN_BUTTON_ARROW;
  if (instance.isOpen) {
    classes.push("open");
  }
  return createElement("span", {
    class: classes,
  });
}
