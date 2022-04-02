import { filterOptions, resetAll } from './actions';
import { container, dropdown } from "./components";
import { CLASS_NAMES, DEFAULT_CONFIG } from "./constants";
import {
  ListOption,
  MountableElement,
  SearchableDropdownConfig,
  SearchableDropdownI
} from "./interfaces";
import { InstanceID } from "./interfaces/common";
import { Store } from "./store";
import { addGlobalEventListener, data_get, generateUniqueID, wrap } from "./utils";
export default class SearchableDropdown implements SearchableDropdownI {
  private _config: SearchableDropdownConfig;
  private _element: HTMLInputElement;
  private _options: ListOption[];
  private _instanceID: InstanceID;
  private _store : Store;
  private _initialized: boolean = false;
  private _listElement: HTMLElement;

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
    this._onChange = this._onChange.bind(this);
    this._onClick = this._onClick.bind(this);
    this._onFocus = this._onFocus.bind(this);

    this._store = new Store();

    //Initialize
    this.init();
  }

  init(): void {
    console.log("Initializing SearchableDropdown");
    this._render();
    this._addEventListeners();
    this._store.subscribe(this._render);
    this._initialized = true;
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

  public get listElement() : HTMLElement{
    return this._listElement;
  }

  public set listElement(listElement: HTMLElement) {
    this._listElement = listElement;
  }

  public get instanceID(): InstanceID {
    return this._instanceID;
  }

  // Internal functions
  _render(): void {
    console.log("Rendering Called");
    if(!this._initialized) {
      this.element.placeholder = data_get(
        this.config,
        "placeholder",
        DEFAULT_CONFIG.placeholder
      );
      const wrapper = container(this);
      wrapper.addEventListener("focus", this._onFocus, true);
      wrap(this.element, wrapper);
      const dropdownList = dropdown(this.options, this);
      this.listElement = dropdownList;
      wrap(dropdownList, wrapper);
      console.log(dropdownList);
    } else {
      this.listElement = dropdown(this.options, this);
    }
  }

  _addEventListeners(): void {
    console.log("Adding Event Listeners");
    this.element.addEventListener("keyup", this._onChange);
    this.element.parentElement?.addEventListener("focus", this._onFocus);

    addGlobalEventListener("click", `.${CLASS_NAMES.SEARCHABLE_DROPDOWN_ITEM_LABEL.join('')}`, this._onClick, document);

  }

  _removeEventListeners(): void {
    console.log("Removing Event Listeners");
    // this.element.removeEventListener("click", this._onClick);
    this.element.parentElement?.removeEventListener("focus", this._onFocus);
    this.element.removeEventListener("keyup", this._onChange);
    document.removeEventListener("click", this._onClick);
  }

  _onClick(e: any): void {
    console.log("Clicked", this, e);
    this.reset();
  }

  _onFocus(e: FocusEvent): void {
    console.log("Focused", this, e);
    this.element?.nextElementSibling?.classList.toggle("hidden");
  }

  _onChange(e: KeyboardEvent): void {

    const target = e.currentTarget as HTMLInputElement;
    const keyword = target.value;
    if(keyword && keyword.trim().length > 0) {
     this._store.dispatch(filterOptions(keyword));
    }
  }

  reset() : this {
    console.log('dispatch reset all');
    this._store.dispatch(resetAll());
    return this;
  }
}
