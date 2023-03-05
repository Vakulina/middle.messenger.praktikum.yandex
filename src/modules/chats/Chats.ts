import tpl from './tpl.hbs';
import { chatSidebar } from '../../components/chatSidebar';
import { Message } from '~src/components/message';
import Block from '~src/services/Block';
import * as s from './style.module.scss';
import { PageLayout } from '~src/components/pageLayout';
import { chatHeader } from '~src/components/chatHeader';
import connectWithStore from '~src/services/connectWithStore';
import { NewChatPopup } from '~src/components/newChatPopup';
import { messageList } from '~src/components/messageList';

const message = new Message();
const sidebar = chatSidebar;
const header = chatHeader;

interface ChatsProps {
  sidebar: Block,
  header?: Block,
  message: Block,
  messageList:Block,
}

export class Chats extends Block {
  constructor(tag:string, props: ChatsProps) {
    super(
      tag = 'section',
      {
        class: s.chats,
        ...props,
      },

    );
  }

  initChildren() {
    this.children = {
      ...this.children,
      newChatPopup: new NewChatPopup({}),
    };
  }

  protected render() {
    return this.compile(tpl, this.props);
  }
}

export const chats = connectWithStore(
  'section',
  Chats,
  (state) => {
    const { isOpenAddNewChatModal } = state;
    return { isOpenAddNewChatModal };
  },
  {
    sidebar, messageList, message, header,
  },
);

const chatsPage = new PageLayout({ content: chats });

export const getChats = () => {
  return chatsPage;
};
