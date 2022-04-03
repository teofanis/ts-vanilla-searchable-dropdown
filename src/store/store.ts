import { AnyAction, createStore, Store as StoreI } from 'redux';
import { ListOption, State } from '../interfaces';
import rootReducer from '../reducers/index';
export default class Store {
  _store: StoreI;

  constructor() {
    this._store = createStore(
      rootReducer,
      (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    );
  }

  subscribe(listener: () => void): () => void {
    return this._store.subscribe(listener);
  }

  dispatch(action: AnyAction): void {
    this._store.dispatch(action);
  }

  get state(): State {
    return this._store.getState();
  }

  get options(): ListOption[] {
    return this.state.options;
  }

  get selected(): ListOption | null {
    return this.state.selected;
  }
}
