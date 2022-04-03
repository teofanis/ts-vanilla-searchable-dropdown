import { SearchableDropdownI } from "../interfaces";
import { createElement } from "../utils";

export function label(instance: SearchableDropdownI): HTMLElement {
  return createElement("label", {
    for: instance.instanceID,
    text: instance.label,
    class: "absolute",
  });
}
