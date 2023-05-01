import { State } from '../utiles';
import { EventBus } from './EventBus';

export enum StoreEvents {
  Updated = 'updated',
  Remove = 'remove',
}

const isSmallScreen =(()=> window.screen.availWidth < 750)()

class Store extends EventBus {
  static _instance: Store;

  state: State | {} = { isOpenAddNewChatModal: isSmallScreen ? false : true, chatsData: [] };

  constructor() {
    if (Store._instance) return Store._instance;
    super();

    Store._instance = this;
    return Store._instance;
  }

  getState(): State | {} {
    return this.state;
  }

  removeState() {
    this.state = {};
    this.emit(StoreEvents.Updated);
    this.emit(StoreEvents.Remove);
  }

  set(nextState: Partial<State>) {
    const prevState = { ...this.state };
    this.state = { ...prevState, ...nextState };
    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
