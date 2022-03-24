import { DEFAULT_CONFIG } from "./constants";
import {
  ListOption,
  MountableElement,
  SearchableDropdownConfig,
  SearchableDropdownI,
} from "./interfaces";
import { data_get } from "./utils";

export default class SearchableDropdown implements SearchableDropdownI {
  private _config: SearchableDropdownConfig;
  private _element: HTMLInputElement;
  private _options: ListOption[];
  constructor(
    element: MountableElement,
    config: Partial<SearchableDropdownConfig> = {},
    options: ListOption[] = []
  ) {
    console.log("SearchableDropdown constructor");
    this.element = element;
    this.config = config;
    this.options = options;
    //`this` Bindings to the current instance
    this._render = this._render.bind(this);
    this._onClick = this._onClick.bind(this);

    //Initialize
    this.init();
  }

  init(): void {
    console.log("Initializing SearchableDropdown");
    this._addEventListeners();
    this._render();
  }

  destroy(): void {
    console.log("Destroying");
    this._removeEventListeners();
  }
  // Config getter
  public get config(): SearchableDropdownConfig {
    console.log("Getting config");
    return this._config;
  }
  // Config setter
  public set config(_config: Partial<SearchableDropdownConfig>) {
    console.log("Setting config");
    this._config = {
      ...DEFAULT_CONFIG,
      ...this._config,
      ..._config,
    };
  }

  // Options getter
  public get options(): ListOption[] {
    console.log("Retrieving Options");
    return this._options;
  }

  // Options setter
  public set options(_options: ListOption[]) {
    console.log("Setting Options");
    this._options = _options;
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
    this.element.placeholder = data_get(
      this.config,
      "placeholder",
      DEFAULT_CONFIG.placeholder
    );
  }

  _addEventListeners(): void {
    console.log("Adding Event Listeners");
    this.element.addEventListener("click", this._onClick);
  }

  _removeEventListeners(): void {
    console.log("Removing Event Listeners");
    this.element.removeEventListener("click", this._onClick);
  }

  _onClick(e: MouseEvent): void {
    console.log("Clicked", this, e);
    this.element.classList.toggle("hidden");
  }
}
