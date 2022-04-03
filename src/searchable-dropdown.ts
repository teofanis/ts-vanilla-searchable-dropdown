import { addOptions, filterOptions, resetAll } from "./actions";
import { selectOption } from "./actions/options";
import { button, container, dropdown } from "./components";
import { CLASS_NAMES, DEFAULT_CONFIG } from "./constants";
import {
  MountableElement,
  SearchableDropdownConfig,
  SearchableDropdownI,
} from "./interfaces";
import { InstanceID } from "./interfaces/common";
import { ListOption } from "./interfaces/ListOption";
import { Store } from "./store";
import {
  addGlobalEventListener,
  data_get,
  generateUniqueID,
  qs,
  wrap,
} from "./utils";
export default class SearchableDropdown implements SearchableDropdownI {
  private _config: SearchableDropdownConfig;
  private _element: HTMLInputElement;
  private _options: ListOption[];
  private _instanceID: InstanceID;
  private _store: Store;
  private _initialized: boolean = false;
  private _listElement: HTMLElement;
  private _containerElement: HTMLElement;
  private _buttonElement: HTMLElement;
  private _isOpen = false;
  private _isSearching = false;
  private _selectedOption: ListOption | null = null;
  constructor(
    element: MountableElement,
    config: Partial<SearchableDropdownConfig> = {},
    options: ListOption[] = []
  ) {
    console.log("SearchableDropdown constructor");
    this._store = new Store();
    this.element = element;
    this.config = config;
    this.options = options;
    this._instanceID = generateUniqueID();
    //`this` Bindings to the current instance
    this._render = this._render.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onClick = this._onClick.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onFocusOut = this._onFocusOut.bind(this);

    //Initialize
    this.init();
  }

  init(): void {
    console.log("Initializing SearchableDropdown");
    this.element.type = "search";
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

  public get isOpen(): boolean {
    return this._isOpen;
  }

  public set isOpen(isOpen: boolean) {
    this._isOpen = isOpen;
    const arrow = qs(".arrow", this.button);
    if (isOpen) {
      if (arrow) {
        arrow.classList.add("open");
      }
      this.listElement.classList.remove("hidden");
      this.element.style.zIndex = "1";
      this.element.focus();
    } else {
      if (arrow) {
        arrow.classList.remove("open");
      }
      this.listElement.classList.add("hidden");
      this.element.style.zIndex = "0";
    }
  }

  public get isSearching(): boolean {
    return this._isSearching;
  }
  // Options getter
  public get options(): ListOption[] {
    console.log("Retrieving Options");
    return this._store.options;
  }

  // Options setter
  public set options(_options: ListOption[]) {
    console.log("Setting Options");
    this._store.dispatch(addOptions(_options));
    this._options = _options;
  }

  public get selectedOption(): ListOption | null {
    return this._store.selected;
  }

  public set selectedOption(selectedOption: ListOption | null) {
    this._selectedOption = selectedOption;
    this._store.dispatch(selectOption(selectedOption));
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

  public get listElement(): HTMLElement {
    return this._listElement;
  }

  public set listElement(listElement: HTMLElement) {
    this._listElement?.remove();
    this._listElement = listElement;
  }

  public get button(): HTMLElement {
    return this._buttonElement;
  }

  public set button(button: HTMLElement) {
    this._buttonElement?.remove();
    this._buttonElement = button;
  }

  public get container(): HTMLElement {
    return this._containerElement;
  }

  public set container(container: HTMLElement) {
    wrap(this.element, container);
    this._containerElement = container;
  }

  public get instanceID(): InstanceID {
    return this._instanceID;
  }

  public get placeholder(): string {
    return data_get(this.config, "placeholder", DEFAULT_CONFIG.placeholder);
  }

  public get listHeight(): string {
    return data_get(this.config, "listHeight", DEFAULT_CONFIG.listHeight);
  }

  // Internal functions
  _render(): void {
    console.log("Rendering Called");
    if (!this._initialized) {
      this.element.placeholder = this.placeholder;
      this.container = container(this);
    }
    this.button = button(this);
    this.listElement = dropdown(this.options, this);
    wrap(this.button, this.container);
    wrap(this.listElement, this.container);
  }

  _addEventListeners(): void {
    console.log("Adding Event Listeners");
    this.element.addEventListener("input", this._onChange);
    this.container.addEventListener("focus", this._onFocus, { capture: true });
    this.container.addEventListener("focusout", this._onFocusOut);
    addGlobalEventListener(
      "click",
      `.${CLASS_NAMES.SEARCHABLE_DROPDOWN_ITEM.join("")}`,
      this._onClick,
      document
    );
  }

  _removeEventListeners(): void {
    console.log("Removing Event Listeners");
    this.container.removeEventListener("focus", this._onFocus);
    this.container.removeEventListener("focusout", this._onFocusOut);
    this.element.removeEventListener("input", this._onChange);
    document.removeEventListener("click", this._onClick);
  }

  _onClick(e: any): void {
    const option = { ...e.target.dataset } as ListOption;
    this.isOpen = false;
    this.selectedOption = option;
  }

  _onFocus(e: any): void {
    //Fix this manual trigger..
    if (e.target.classList.contains(CLASS_NAMES.SEARCHABLE_DROPDOWN_ITEM)) {
      e.target.click();
      return;
    }
    this.isOpen = true;
  }

  _onFocusOut(e: any): void {
    // console.log("Focus Out", this, e);
    // If the focused element is within the focused one, we want to keep the dropdown open
    if (!e.currentTarget.contains(e.relatedTarget)) {
      this.isOpen = false;
    }
  }

  _onChange(e: any): void {
    const target = e.currentTarget as HTMLInputElement;
    const keyword = target.value;
    this._isSearching = Boolean(keyword.trim().length);
    this._store.dispatch(filterOptions(keyword.trim(), this._options));
  }

  reset(): this {
    console.log("dispatch reset all");
    this._store.dispatch(resetAll());
    return this;
  }
}
