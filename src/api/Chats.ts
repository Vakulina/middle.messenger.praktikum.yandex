import { UserDTO } from './Auth';
import BaseAPI from './BaseAPI';

export type ChatsDTOType = {
  id: number,
  title: string,
  avatar: string,
  unread_count: number,
  last_message: {
    user: Partial<UserDTO>,
    time: string,
    content: string
  }
}

export class ChatsApi extends BaseAPI {
  constructor() {
    super('/chats');
  }

async  createChat(title: string) {
    return this.http.post('',  {data:{title }}) as Promise<{id:number}>
  }


  async getChats() {
    return this.http.get('')
      .then((res: string) => res) as Promise<ChatsDTOType[]>
  }

  deleteChat(chatId: number) {
    return this.http.delete('', {
      chatId: chatId,
    })
  }

  addUsers(Usersid: number[], chatId: number) {
    return this.http.put('/users', {
      users: [Usersid],
      chatId: chatId,
    })
  }

  deleteUsers(Usersid: number[], chatId: number) {
    return this.http.delete('/users', {
      users: [Usersid],
      chatId: chatId,
    })
  }

  getNewMessagesCount(id: number): Promise<any> {
    return this.http.get(`/new/${id}`)
  }

  getChatToken(chat_id: number) {
    return this.http.post(`/token/${chat_id}`)
      .then((res: string) => JSON.parse(res))
  }

  create = undefined;
  update = undefined;
  delete = undefined;
  read = undefined;
}

export default new ChatsApi();

