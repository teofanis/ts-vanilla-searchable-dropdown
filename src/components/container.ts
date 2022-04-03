import { CLASS_NAMES } from "../constants";
import { SearchableDropdownI } from "../interfaces";
import { createElement } from "../utils";

export function container(instance: SearchableDropdownI): HTMLElement {
  // if (instance.container) {
  //   return document.createDocumentFragment() as unknown as HTMLElement;
  // }
  return createElement("div", {
    id: instance.instanceID,
    class: CLASS_NAMES.SEARCHABLE_DROPDOWN_CONTAINER,
    tabindex: 0,
  });
}
