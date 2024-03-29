import tpl from './tpl.hbs';
import connectWithStore from '../../services/connectWithStore';
import s from './style.module.scss';
import { getMessageList } from './utiles';
import Block from '../../services/Block';

class messageListBase extends Block {
  constructor(tag = 'div', { chatsData = [], ...props }: any) {
    super(tag, {
      class: s.messageList,
      chatsData,
      ...props,
    });
  }

  initChildren() {
    this.children = {
      ...this.children,
      chatsData: getMessageList(this.state?.chatsData || []),
    };
  }

  render(): DocumentFragment {
    return this.compile(tpl, this.props);
  }
}

export const messageList = connectWithStore('ul', messageListBase, (state) => {
  const { chatsData } = state;
  return { chatsData };
});
