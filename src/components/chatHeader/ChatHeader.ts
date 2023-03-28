import tpl from './tpl.hbs';
import Block from '../../services/Block';
import avatar from '../../../static/avatar.jpg';
import dots from '../../../static/dots.svg';
import { Image } from '../Image';
import { Button } from '../Button';
import connectWithStore from '../../services/connectWithStore';
import Store from '../../services/Store';
import { getChatHeaderMenu } from '../ChatHeaderMenu';
import { addUserPopup } from '../AddUserPopup';
import { deleteUserPopup } from '../DeleteUserPopup';
import style from './style.module.scss';
import { API_BASE_URL } from '../../utiles/constants';

export class ChatHeaderBase extends Block {
  constructor(tag = 'div', {
    activeChat,
    isOpenHeaderMenuModal,
    isOpenAddUserModal,
    isOpenDeleteUserModal,
    ...props
  }: any) {
    super(tag, {
      class: style.header,
      isOpenHeaderMenuModal,
      isOpenDeleteUserModal,
      isOpenAddUserModal,
      activeChat,
      style,
      ...props,
    });
  }

  initChildren() {
    this.children = {
      ...this.children,
      avatar: new Image({
        alt: 'аватар',
        stylePrefix: 'chatItems',
        src: this.state?.activeChat?.avatar ? `${API_BASE_URL}/resources${this.state?.activeChat?.avatar}` : avatar,
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
