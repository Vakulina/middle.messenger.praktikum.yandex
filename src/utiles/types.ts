import { UserDTO } from '../api/AuthApi';
import { ChatsDTOType } from '../api/ChatsApi';

export type InputEventType = Event & { target: HTMLInputElement };
export type BtnEventType = Event & { target: HTMLButtonElement };
export type State = {
  user: Omit<UserDTO, 'password'>,
  chats: Partial<ChatsDTOType>[],
  activeChat: ChatsDTOType | null;
  usersOfActiveChat: UserDTO[];
  isAuthError: { message: string, status: number } | null,
  isRegistrationError: { message: string, status?: number, name?: string } | null,
  isLogin: boolean,
  avatar: string | Blob,
  avatarName: string,
  isRegistrationSettingsError: { message: string, status: number } | null,
  isPasswordSettingsError: { message: string, status: number } | null,
  isOpenAddNewChatModal: boolean;
  isOpenAddUserModal: boolean;
  isOpenDeleteUserModal: boolean;
  isOpenHeaderMenuModal: boolean;
  isServerError: { message: string, status: number } | null,
  chatsData: MessageType[],
};

export type MessageType = {
  chat_id: number,
  content: string,
  file: null | any,
  id: number,
  is_read: boolean,
  time: string,
  type: 'message',
  user_id: number
};
