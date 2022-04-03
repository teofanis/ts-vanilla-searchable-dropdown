import _ from "lodash";
import { InstanceID } from "../interfaces";

export function data_get(object: object, path: string, defaultValue: unknown) {
  return _.get(object, path, defaultValue);
}

export function first<T>(array: Array<T>, n = 1): T | T[] {
  if (n === 1) return array[0];
  return array.filter((_, i) => i < n);
}

export function last<T>(array: Array<T>, n = 1): T | T[] {
  if (n === 1) return array[array.length - 1];
  return array.filter((_, i) => array.length - i <= n);
}

export function pluck(array: Array<Record<string, unknown>>, key: string) {
  return array.map((el) => (el.hasOwnProperty(key) ? el[key] : null));
}

export function generateUniqueID(): InstanceID {
  const dateString = Date.now().toString(36);
  const randomString = Math.random().toString(36).substring(2, 8);
  return `${dateString}-${randomString}`;
}

export function wrap(element: HTMLElement, wrapper: HTMLElement): void {
  const parent = element.parentNode;
  if (parent) {
    parent.insertBefore(wrapper, element);
  }
  wrapper.appendChild(element);
}

export function addGlobalEventListener(
  eventName: string,
  selector: string,
  callback: (e: Event) => void,
  element: Element | Document | Window = document,
  options?: AddEventListenerOptions
): void {
  element.addEventListener(
    eventName,
    (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.matches(selector)) {
        callback(event);
      }
    },
    options
  );
}

export function qs(
  selector: string,
  element: ParentNode = document
): HTMLElement | null {
  return element.querySelector(selector);
}

export function qsa(
  selector: string,
  element: ParentNode = document
): Element[] {
  return Array.from(element.querySelectorAll(selector));
}

export function createElement(
  tagName: string,
  attributes: object = {}
): HTMLElement {
  const element = document.createElement(tagName);
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === "class") {
      let classNames = Array.isArray(value) ? value : [value];
      element.classList.add(...classNames);
      return;
    }
    if (key === "dataset") {
      Object.entries(value).forEach(([dataKey, dataValue]) => {
        //@ts-ignore
        element.dataset[dataKey] = is_scalar(dataValue)
          ? dataValue
          : JSON.stringify(dataValue);
      });
      return;
    }

    if (key === "text") {
      element.textContent = value;
      return;
    }
    element.setAttribute(key, value);
  });
  return element;
}

export function is_scalar(value: unknown): boolean {
  return (
    value === null ||
    value === undefined ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  );
}
