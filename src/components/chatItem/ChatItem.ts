import tpl from './tpl.hbs';
import * as s from "./style.module.scss";
import Block from '~src/services/Block';
import Store from '~src/services/Store';
import connectWithStore from '~src/services/connectWithStore';
import { ChatsDTOType } from '~src/api/ChatsApi';
import { chatsActions } from '~src/actions/ChatsActions';
import {setWebSocket} from '~src/actions/setWebSocket'

interface ChatItemProps {
  chatId: number,
  name: string,
  text: string,
  time: string | Date,
  count?: number | null,
  avatar?: Block,
  stylePrefix?: string | null,
  events?: {
    click: (e?: Event) => void;
  },
  isActive?: boolean,
  chats?: ChatsDTOType[]
}

export class ChatItemBase extends Block {
  constructor(tag = 'div', {
    isActive,
    chatId,
    chats,
    ...otherProps
  }: ChatItemProps) {
    super(
      tag,
      {
        class: s.chatItem,
        events: {
          click: async (e: any) => {
            const activeChat = chats?.filter((item: ChatsDTOType) => (item.id === Number(e?.currentTarget.getAttribute("data-chatid"))))[0]
            const usersOfActiveChat = await chatsActions.getUsersByChat(Number(e?.currentTarget.getAttribute("data-chatid")))
            Store.set({ isOpenAddNewChatModal: false })
            Store.set({ isOpenHeaderMenuModal: false })
            Store.set({ activeChat })
            Store.set({ usersOfActiveChat })
            
            await setWebSocket(chatId);
          },
        },
        active: isActive,
        ...otherProps,
      },
    );
    this.addAttribute({ 'data-chatid': chatId })
    this.addAttribute({ 'active': String(isActive) })
  }

  protected render() {
    return this.compile(tpl, this.props);
  }
}
export const getChatItem = (props: Partial<ChatItemProps>) => connectWithStore(
  'div',
  ChatItemBase as typeof Block,
  (state) => {
    const { activeChat, chats } = state;
    return { activeChat, chats }
  },
  props)
