import tpl from './tpl.hbs';
import { ChatSidebar } from '../../components/chatSidebar';
import { items } from './constants';
import { Message } from '~src/components/message';
import Block from '~src/services/Block';
import s from './style.module.scss';
import { PageLayout } from '~src/components/pageLayout';
import { ChatHeader } from '~src/components/chatHeader';

const message = new Message();
const sidebar = new ChatSidebar({ items });
const header = new ChatHeader();

interface ChatsProps {
  sidebar: Block,
  header?: Block,
  chatHistory?: Block,
  message: Block,
}

export class Chats extends Block {
  constructor(props: ChatsProps) {
    super(
      'section',
      {
        class: s.chats,
        ...props,
      },
    );
  }

  protected render() {
    return this.compile(tpl, this.props);
  }
}

const chats = new Chats({ sidebar, message, header });

export const getChats = () => new PageLayout({ content: chats });
