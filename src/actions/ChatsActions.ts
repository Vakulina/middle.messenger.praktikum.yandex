import { UserDTO } from '~src/api/AuthApi';
import ChatsAPI, { ChatsApi, ChatsDTOType } from '~src/api/ChatsApi';
import Store from '~src/services/Store';

class ChatsActions {
  private readonly api: ChatsApi;

  constructor() {
    this.api = ChatsAPI;
  }

  async getChats() {
    const response: ChatsDTOType[] = await this.api.getChats();
    Store.set({ 'chats': response })
    return response
  }

  async createChat(data: { title: string }) {
    const { title } = data;
    try {
      const res = await this.api.createChat(title)
      const chats = await this.getChats()

      const activeChat = chats.filter((item) => (item.id === res.id))[0]
      Store.set({ activeChat })
      Store.set({ isOpenAddNewChatModal: false })
      Store.set({ isOpenHeaderMenuModal: false })
    } catch (e: unknown) {
      console.error('createChat:', e);
    }
  }

  async deleteChatById() {
    const state = Store.getState()
    if (('activeChat' in state) && (state.activeChat) && ('id' in state.activeChat)) {
      const chat_id = state.activeChat?.id
      try {
        await this.api.deleteChat(chat_id);
        Store.set({ isOpenAddNewChatModal: true })
        Store.set({ isOpenHeaderMenuModal: false })
        Store.set({ activeChat: null })
        this.getChats()
      } catch (e: unknown) {
        console.error('deleteChatById:', e);
      }
    }
  }


  async addUsersToChat(users: number[]) {
    const state = Store.getState()
    if ('activeChat' in state) {
      const chat_id = state.activeChat!.id
      try {
        await this.api.addUsers(users, chat_id);
        await this.getChats()
        Store.set({ isOpenAddUserModal: false })
      } catch (e: unknown) {
        console.error('addUsersToChat:', e);
      }
    }
  }

  async deleteUsersFromChat(users: number[]) {
    const state = Store.getState()
    if ('activeChat' in state) {
      const chat_id = state!.activeChat!.id

      try {
        await this.api.deleteUsers(users, chat_id);
        await this.getChats()
        Store.set({ isOpenDeleteUserModal: false })
        Store.set({ isOpenHeaderMenuModal: false })

        if (!(state.chats.includes(state.activeChat as ChatsDTOType))) Store.set({ isOpenAddNewChatModal: true })
      } catch (e: unknown) {
        console.error('deleteUsersFromChat:', e);
      }
    }
  }

  async getUsersByChat(id: number): Promise<UserDTO[]> {
    console.log("Action get users by id ", id)
    return this.api.getUsersByChat(id) as Promise<UserDTO[]>
  }

  async getToken(chat_id: number) {
    try {
      const response = await this.api.getChatToken(chat_id)
      return response.token
    } catch (err: unknown) {
      console.error('addUsersToChat:', err);
    }
  }
}

export const chatsActions = new ChatsActions();
