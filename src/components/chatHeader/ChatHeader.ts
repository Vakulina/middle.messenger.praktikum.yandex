import tpl from './tpl.hbs';
import * as s from './style.module.scss';
import Block from '~src/services/Block';
import avatar from '../../../static/avatar.jpg';
import dots from '../../../static/dots.svg';
import { Image } from '../image';
import { Button } from '../button';
import connectWithStore from '~src/services/connectWithStore';
import Store from '~src/services/Store';
import { getChatHeaderMenu } from './ChatHeaderMenu';
import { addUserPopup } from './AddUserPopup';
import { deleteUserPopup } from './DeleteUserPopup';

export class ChatHeaderBase extends Block {
  constructor(tag:string, {
    activeChat,
    isOpenHeaderMenuModal,
    isOpenAddUserModal,
    isOpenDeleteUserModal,
    ...props
  }: any) {
    super(tag = 'div', {
      class: s.header,
      isOpenHeaderMenuModal,
      isOpenDeleteUserModal,
      isOpenAddUserModal,
      activeChat,
      ...props,
    });
  }

  initChildren() {
    this.children = {
      ...this.children,
      avatar: new Image({
        alt: 'аватар',
        stylePrefix: 'chatItems',
        src: this.state?.activeChat?.avatar || avatar,
      }),
      button: new Button({
        text: new Image({
          src: dots,
          stylePrefix: 'dots',
        }),
        stylePrefix: 'withArrow',
        type: 'button',
        events: {
          click: () => {
            Store.set({ isOpenHeaderMenuModal: !(this.state?.isOpenHeaderMenuModal) });
          },
        },
        name: 'sendMessage',
      }),
      chatHeaderMenu: getChatHeaderMenu(),
      addUserPopup,
      deleteUserPopup,
    };
  }

  protected render() {
    return this.compile(tpl, this.props);
  }
}

export const chatHeader = connectWithStore('div', ChatHeaderBase, (state) => {
  const {
    activeChat, isOpenHeaderMenuModal, isOpenAddUserModal, isOpenDeleteUserModal,
  } = state;
  return {
    activeChat, isOpenHeaderMenuModal, isOpenAddUserModal, isOpenDeleteUserModal,
  };
});
