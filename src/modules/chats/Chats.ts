import tpl from './tpl.hbs';
import { chatSidebar } from '../../components/chatSidebar';
import { Message } from '~src/components/message';
import Block from '~src/services/Block';
import * as s from "./style.module.scss";
import { PageLayout } from '~src/components/pageLayout';
import { ChatHeader } from '~src/components/chatHeader';
import connectWithStore from '~src/services/connectWithStore';
import { NewChatPopup } from '~src/components/newChatPopup';

const message = new Message();
const sidebar = chatSidebar;
const header = new ChatHeader();

interface ChatsProps {
  sidebar: Block,
  header?: Block,
  chatHistory?: Block,
  message: Block,
}

export class Chats extends Block {
  constructor(tag = 'section', props: ChatsProps) {
    super(
      tag,
      {
        class: s.chats,
        ...props,
      },
    );
  }
  initChildren() {
    this.children = {
      ...this.children,
      newChatPopup: new NewChatPopup({}) 
    };
  }

  protected render() {
    return this.compile(tpl, this.props);
  }
}

export const chats = connectWithStore('form',
  Chats,
  (state) => {
    const { isOpenAddNewChatModal } = state;
    return { isOpenAddNewChatModal }
  },
  { sidebar, message, header }
)

const chatsPage = new PageLayout({ content: chats });

export const getChats = () => {
  return chatsPage;
};


