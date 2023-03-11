import tpl from './tpl.hbs';
import  s from './style.module.scss';
import Block from '../../services/Block';
import { Panel } from './ControlPanel';
import connectWithStore from '../../services/connectWithStore';
import { getChatList } from './utiles';
import { chatsActions } from '../../actions/ChatsActions';

class ChatSidebarBase extends Block {
  constructor(tag = 'sidebar', props: any) {
    super(
      tag,
      {
        class: s.sidebar,
        ...props,
      },
    );
    chatsActions.getChats();
  }

  initChildren() {
    this.children = {
      items: getChatList(this.state.chats || [], this.state.activeChat),
      panel: new Panel(),
    };
  }

  protected render() {
    return this.compile(tpl, this.props);
  }
}

export const chatSidebar = connectWithStore('sidebar', ChatSidebarBase as typeof Block, (state) => {
  const { chats, activeChat } = state;
  return { chats, activeChat };
});
