import { UserDTO } from '~src/api/AuthApi';
import { ChatsDTOType } from '~src/api/ChatsApi';
import { EventBus } from './EventBus';

export enum StoreEvents {
  Updated = 'updated',
  Remove = 'remove'
}

export type State = {
  user: Omit<UserDTO, "password">,
  chats: Partial<ChatsDTOType>[],
  activeChat: ChatsDTOType|null;
  usersOfActiveChat:UserDTO[];
  isAuthError: { message: string, status: number } | null,
  isRegistrationError: { message: string, status?: number, name?: string } | null,
  isLogin: boolean,
  avatar: string | Blob,
  avatarName: string,
  isRegistrationSettingsError: { message: string, status: number } | null,
  isPasswordSettingsError: { message: string, status: number } | null,
  isOpenAddNewChatModal: boolean;
  isOpenAddUserModal:boolean;
  isOpenDeleteUserModal:boolean;
  isOpenHeaderMenuModal: boolean;
  isServerError: { message: string, status: number } | null,
  chatsData: {messages: any, chatId:number}[],
  chatMessages:any
}

class Store extends EventBus {

  static _instance: Store;
  state: State | {} = {isOpenAddNewChatModal:true, chatsData:[]};

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
