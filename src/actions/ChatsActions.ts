import { UserDTO } from '../api/AuthApi';
import ChatsAPI, { ChatsApi, ChatsDTOType } from '../api/ChatsApi';
import { setWebSocket } from '../services/setWebSocket';
import Store from '../services/Store';
import { WebsocketService } from '../services/WebsocketService';

const isSmallScreen =(()=> window.screen.availWidth < 750)()

class ChatsActions {
  private readonly api: ChatsApi;

  constructor() {
    this.api = ChatsAPI;
  }

  async getChats() {
    const response: ChatsDTOType[] = await this.api.getChats();

    const state = Store.getState();
    if (('activeChat' in state) && (state.activeChat) && ('id' in state.activeChat)) {
      const activeChat = response.filter((item) => (item.id === state.activeChat.id))[0];
      Store.set({ activeChat });
      if (!activeChat && !isSmallScreen) Store.set({ isOpenAddNewChatModal: true });
    }
    Store.set({ chats: response });
    return response;
  }

  async createChat(data: { title: string }) {
    const { title } = data;
    try {
      const res = await this.api.createChat(title);
      const chats = await this.getChats();

      const activeChat = chats.filter((item) => (item.id === res.id))[0];
      Store.set({ activeChat });
      Store.set({ isOpenAddNewChatModal: false });
      Store.set({ isOpenHeaderMenuModal: false });
      Store.set({ chatsData: [] });
    } catch (e: unknown) {
      console.error('createChat:', e);
    }
  }

  async deleteChatById() {
    const state = Store.getState();
    if (('activeChat' in state) && (state.activeChat) && ('id' in state.activeChat)) {
      const chat_id = state.activeChat?.id;
      try {
        await this.api.deleteChat(chat_id);
        Store.set({ isOpenAddNewChatModal: true });
        Store.set({ isOpenHeaderMenuModal: false });
        Store.set({ activeChat: null });
        this.getChats();
      } catch (e: unknown) {
        console.error('deleteChatById:', e);
      }
    }
  }

  async addUsersToChat(users: number[]) {
    const state = Store.getState();
    if ('activeChat' in state) {
      const chat_id = state.activeChat!.id;
      try {
        await this.api.addUsers(users, chat_id);
        await this.getChats();
        await this.getUsersByChat(chat_id);
        Store.set({ isOpenAddUserModal: false });
      } catch (e: unknown) {
        console.error('addUsersToChat:', e);
      }
    }
  }

  async deleteUsersFromChat(users: number[]) {
    const state = Store.getState();
    if ('activeChat' in state) {
      const chat_id = state!.activeChat!.id;

      try {
        await this.api.deleteUsers(users, chat_id);
        await this.getChats();
        await this.getUsersByChat(chat_id);
        Store.set({ isOpenDeleteUserModal: false });
        Store.set({ isOpenHeaderMenuModal: false });

        if (!(state.chats.includes(state.activeChat as ChatsDTOType))) Store.set({ isOpenAddNewChatModal: true });
      } catch (e: unknown) {
        console.error('deleteUsersFromChat:', e);
      }
    }
  }

  async getUsersByChat(id: number): Promise<UserDTO[]> {
    return this.api.getUsersByChat(id) as Promise<UserDTO[]>;
  }

  async getToken(chat_id: number): Promise<unknown> {
    try {
      const response = await this.api.getChatToken(chat_id);
      return response.token;
    } catch (err: unknown) {
      console.error(err);
      return err;
    }
  }

  async getMessagesOfChat(messages: any) {
    const state = Store.getState();
    if (!('chatsData' in state) || !('activeChat' in state)) return;
    const chatsDataAtStore = state.chatsData;
    let newChatsData = [];

    if (Array.isArray(messages)) {
      newChatsData = [...messages];
    } else {
      newChatsData = [messages, ...chatsDataAtStore];
    }

    Store.set({ chatsData: newChatsData });
  }

  async sendMessage(text: string) {
    const state = Store.getState();
    if (('activeChat' in state) && (state.activeChat) && ('id' in state.activeChat)) {
      const chatId = state.activeChat?.id;
      const ws = await setWebSocket(chatId);
      if (!ws) {

      } else if (ws instanceof WebsocketService) ws.sendMessage(text);
    }
  }

  async getOldMessagesOfChat(from = 0) {
    const state = Store.getState();
    if (('activeChat' in state) && (state.activeChat) && ('id' in state.activeChat)) {
      const chatId = state.activeChat?.id;
      const ws = await setWebSocket(chatId);
      if (!ws) {
        return;
      }
      if (ws instanceof WebsocketService) ws.getOldMessages(from);
    }
  }
}

export const chatsActions = new ChatsActions();
