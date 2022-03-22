import { DEFAULT_CONFIG } from "./constants/defaults";
import { MountableElement } from "./interfaces/common";
import { SearchableDropdown as SearchableDropdownI } from "./interfaces/SearchableDropdown";
import { SearchableDropdownConfig } from "./interfaces/SearchableDropdownConfig";

class SearchableDropdown implements SearchableDropdownI {
  private _config: SearchableDropdownConfig;
  private _element: HTMLInputElement;
  constructor(
    element: MountableElement,
    config: SearchableDropdownConfig = {}
  ) {
    console.log("SearchableDropdown constructor");
    this.element = element;
    this.config = config;

    //`this` Bindings to the current instance
    this._render = this._render.bind(this);

    //Initialize
    this.init();
  }

  init(): void {
    console.log("Initializing SearchableDropdown");
    this._render();
  }

  // Config getter
  public get config(): SearchableDropdownConfig {
    console.log("Getting config");
    return this._config;
  }
  // Config setter
  public set config(_config: SearchableDropdownConfig) {
    console.log("Setting config");
    this._config = {
      ...DEFAULT_CONFIG,
      ...this._config,
      ..._config,
    };
  }

  // Element getter
  public get element(): HTMLInputElement {
    return this._element;
  }

  // Element setter
  public set element(_element: MountableElement) {
    if (!(_element instanceof HTMLInputElement)) {
      const nodes = document.querySelectorAll(_element);
      if (nodes.length === 0) {
        throw new Error(`Element ${_element} not found`);
      }
      const inputEl = nodes[0];
      if (!(inputEl instanceof HTMLInputElement)) {
        throw new Error("Element must be an input element");
      }
      _element = inputEl;
    }
    this._element = _element;
  }

  // Internal functions
  _render(): void {
    console.log("Rendering Called");
    this.element.placeholder = this.config.placeholder;
  }
}

export default SearchableDropdown;
