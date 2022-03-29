import { SearchableDropdown } from "searchable-dropdown";
const container = document.getElementsByClassName("example-app-container")[0];
let someInputElement = document.createElement("input");
someInputElement.type = "text";
someInputElement.className = "searchable-dropdown-js";
container.appendChild(someInputElement);

const searchable_instance = new SearchableDropdown(someInputElement, {}, [
  {
    value: "value1",
    label: "label1",
  },
  {
    value: "value2",
    label: "label2",
  },
]);
console.log(searchable_instance);
