import { SearchableDropdownI } from '../interfaces';
import { createElement } from '../utils';
import { CLASS_NAMES } from './../constants/defaults';

export function button(instance: SearchableDropdownI): HTMLElement {
  const buttonEl = createElement('button', {
    class: CLASS_NAMES.SEARCHABLE_DROPDOWN_BUTTON,
  });

  const span = createElement('span', {
    text: instance.selectedOption?.value ?? instance.placeholder,
    class: CLASS_NAMES.SEARCHABLE_DROPDOWN_BUTTON_LABEL,
  });

  const arrowEl = arrow(instance);
  buttonEl.appendChild(span);
  buttonEl.appendChild(arrowEl);
  return buttonEl;
}

export function arrow(instance: SearchableDropdownI): HTMLElement {
  const classes = CLASS_NAMES.SEARCHABLE_DROPDOWN_BUTTON_ARROW;
  if (instance.isOpen) {
    classes.push('open');
  }
  return createElement('span', {
    class: classes,
  });
}
