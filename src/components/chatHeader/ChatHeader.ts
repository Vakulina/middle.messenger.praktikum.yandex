import tpl from './tpl.hbs';
import * as s from "./style.module.scss";
import Block from '~src/services/Block';
import avatar from '../../../static/avatar.jpg';
import dots from '../../../static/dots.svg';
import { Image } from '../image';
import { Button } from '../button';
import { BtnEventType } from '~src/utiles';
import connectWithStore from '~src/services/connectWithStore'
import Store from '~src/services/Store';
import { getChatHeaderMenu } from './ChatHeaderMenu';

export class ChatHeaderBase extends Block {
  constructor(tag = 'div', {
    activeChat,
    isOpenHeaderMenuModal,
    ...props }: any
  ) {
    super(tag, {
      class: s.header,
      isOpenHeaderMenuModal,
      activeChat,
      ...props
    });

  }

  initChildren() {
    this.children = {
      ...this.children,
      avatar: new Image({
        alt: 'аватар',
        stylePrefix: 'chatItems',
        src: this.state?.activeChat?.avatar || avatar
      }),
      button: new Button({
        text: new Image({
          src: dots,
          stylePrefix: 'dots',
        }),
        stylePrefix: 'withArrow',
        type: 'button',
        events: {
          click: (e: BtnEventType) => {
            Store.set({ isOpenHeaderMenuModal: !(this.state?.isOpenHeaderMenuModal) })
          }
        },
        name: 'sendMessage',
      }),
      chatHeaderMenu: getChatHeaderMenu( {isAvailableToDelete: !!this.state?.activeChat&&(this.state.activeChat.created_by == this.state?.user?.id)})
    }
  }

  protected render() {
    return this.compile(tpl, this.props);
  }
}

export const chatHeader = connectWithStore('div', ChatHeaderBase, (state) => {
  const { activeChat, isOpenHeaderMenuModal } = state;
  return { activeChat, isOpenHeaderMenuModal }
})
