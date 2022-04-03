import { SearchableDropdown } from "searchable-dropdown";
const container = document.getElementsByClassName("example-app-container")[0];
let someInputElement = document.createElement("input");
someInputElement.type = "text";
someInputElement.className = "searchable-dropdown-js";
container.appendChild(someInputElement);

fetch("https://pokeapi.co/api/v2/pokemon?limit=1126")
  .then((res) => res.json())
  .then((data) => {
    //@ts-ignore
    const options = data.results.map((item) => {
      return {
        value: item.name,
        label: item.name,
      };
    });
    const searchable_instance = new SearchableDropdown(
      someInputElement,
      {
        label: "Select Pokemon",
      },
      options
    );
    console.log(searchable_instance);
  });
