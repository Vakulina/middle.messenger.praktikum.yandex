import tpl from './tpl.hbs';
import { chatSidebar } from '../../components/ChatSidebar';
import { MessageForm } from '../../components/MessageForm';
import Block from '../../services/Block';
import s from './style.module.scss';
import { PageLayout } from '../../components/PageLayout';
import { chatHeader } from '../../components/ChatHeader';
import connectWithStore from '../../services/connectWithStore';
import { NewChatPopup } from '../../components/NewChatPopup';
import { messageList } from '../../components/MessageList';

const message = new MessageForm();
const sidebar = chatSidebar;
const header = chatHeader;

interface ChatsProps {
  sidebar: Block,
  header?: Block,
  message: Block,
  messageList:Block,
}

export class Chats extends Block {
  constructor(tag= 'section', props: ChatsProps) {
    super(
      tag ,

      {
        class: s.chats,
        style:s,
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
