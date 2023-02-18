import { EventBus } from './EventBus';

export enum StoreEvents {
  Updated = 'updated',
  Remove = 'remove'
}

export default class Store extends EventBus {

  static _instance: Store;
  static STORE_NAME = 'myAppStore';
  _state = {};

  constructor() {

    if (Store._instance) return Store._instance;

    super();
    const savedState = localStorage.getItem(Store.STORE_NAME);
    this._state = savedState ? (JSON.parse(savedState) ?? {}) : {}
    Store._instance = this;

    this.on(
      StoreEvents.Updated,
      () => { localStorage.setItem(Store.STORE_NAME, JSON.stringify(this._state)); }
    );
    this.on(
      StoreEvents.Remove,
      () => { localStorage.removeItem(Store.STORE_NAME); }
    );
  }

  getState() {
    return this._state;
  }

  removeState() {
    this._state = {};
    this.emit(StoreEvents.Updated);
    this.emit(StoreEvents.Remove);
  }

  set(nextState: Partial<Store>) {
    const prevState = { ...this._state };
    this._state = { ...this._state, ...nextState };
    this.emit(StoreEvents.Updated, prevState, nextState);
  }
}
