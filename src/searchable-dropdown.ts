import { container, dropdown } from "./components";
import { DEFAULT_CONFIG } from "./constants";
import {
  ListOption,
  MountableElement,
  SearchableDropdownConfig,
  SearchableDropdownI,
} from "./interfaces";
import { InstanceID } from "./interfaces/common";
import { data_get, generateUniqueID, wrap } from "./utils";

export default class SearchableDropdown implements SearchableDropdownI {
  private _config: SearchableDropdownConfig;
  private _element: HTMLInputElement;
  private _options: ListOption[];
  private _instanceID: InstanceID;
  constructor(
    element: MountableElement,
    config: Partial<SearchableDropdownConfig> = {},
    options: ListOption[] = []
  ) {
    console.log("SearchableDropdown constructor");
    this.element = element;
    this.config = config;
    this.options = options;
    this._instanceID = generateUniqueID();
    //`this` Bindings to the current instance
    this._render = this._render.bind(this);
    this._onClick = this._onClick.bind(this);
    this._onFocus = this._onFocus.bind(this);

    //Initialize
    this.init();
  }

  init(): void {
    console.log("Initializing SearchableDropdown");
    this._render();
    this._addEventListeners();
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

  public get instanceID(): InstanceID {
    return this._instanceID;
  }

  // Internal functions
  _render(): void {
    console.log("Rendering Called");
    this.element.placeholder = data_get(
      this.config,
      "placeholder",
      DEFAULT_CONFIG.placeholder
    );

    const wrapper = container(this);
    wrapper.addEventListener("focus", this._onFocus, true);
    wrap(this.element, wrapper);
    const dropdownList = dropdown(this.options, this);
    wrap(dropdownList, wrapper);
    console.log(dropdownList);
  }

  _addEventListeners(): void {
    console.log("Adding Event Listeners");
    // this.element.addEventListener("click", this._onClick);
    this.element.parentElement?.addEventListener("focus", this._onFocus);

    this.element.nextSibling.childNodes.forEach((child) => {
      child.addEventListener("click", this._onClick);
    });
  }

  _removeEventListeners(): void {
    console.log("Removing Event Listeners");
    // this.element.removeEventListener("click", this._onClick);
    this.element.parentElement?.removeEventListener("focus", this._onFocus);
  }

  _onClick(e: any): void {
    console.log("Clicked", this, e);
  }

  _onFocus(e: FocusEvent): void {
    console.log("Focused", this, e);
    this.element?.nextElementSibling.classList.toggle("hidden");
  }
}
