import { UserDTO } from '~src/api/Auth';
import { EventBus } from './EventBus';

export enum StoreEvents {
  Updated = 'updated',
  Remove = 'remove'
}

export type State = {
  user: Omit<UserDTO, "password">,
  isAuthError: { message: string, status: number } | null,
  isRegistrationError: { message: string, status?: number, name?: string } | null,
  isLogin: boolean,
  avatar?: string
}

class Store extends EventBus {

  static _instance: Store;
  static STORE_NAME = 'myAppStore';
  _state = {};

  constructor() {
    if (Store._instance) return Store._instance;
    super();
    const savedState = undefined //localStorage.getItem(Store.STORE_NAME);
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
    return Store._instance;
  }

  getState() {
    return this._state;
  }

  removeState() {
    this._state = {};
    this.emit(StoreEvents.Updated);
    this.emit(StoreEvents.Remove);
  }

  set(nextState: Partial<State>) {
    const prevState = { ...this._state };
    this._state = { ...this._state, ...nextState };
    this.emit(StoreEvents.Updated, prevState, nextState);
  }
}

export default new Store();
