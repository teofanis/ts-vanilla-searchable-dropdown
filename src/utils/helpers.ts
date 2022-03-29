import _ from "lodash";
import { InstanceID } from "../interfaces";

export function data_get(object: object, path: string, defaultValue: unknown) {
  return _.get(object, path, defaultValue);
}

export function wrap(element: HTMLElement, wrapper: HTMLElement): void {
  const parent = element.parentNode;
  if (parent) {
    parent.insertBefore(wrapper, element);
  }
  wrapper.appendChild(element);
}

export function generateUniqueID(): InstanceID {
  const dateString = Date.now().toString(36);
  const randomString = Math.random().toString(36).substring(2, 8);
  return `${dateString}-${randomString}`;
}
