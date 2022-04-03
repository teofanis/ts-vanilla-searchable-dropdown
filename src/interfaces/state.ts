import { ListOption } from "./ListOption";

export interface State {
  options: ListOption[];
  selected: ListOption | null;
}
