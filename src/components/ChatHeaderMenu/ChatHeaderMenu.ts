import tpl from './tpl.hbs';
import s from './style.module.scss';
import Block from '../../services/Block';
import { Button } from '../Button';
import connectWithStore from '../../services/connectWithStore';
import { chatsActions } from '../../actions/ChatsActions';
import Store from '../../services/Store';

export class ChatHeaderMenuBase extends Block {
  constructor(tag = 'div', {
    activeChat,
    user,
    isAvailableToDelete,
    ...props
  }: any) {
    super(tag, {
      activeChat,
      isAvailableToDelete,
      user,
      class: s.menu,
      ...props,
    });
    this.setProps({ isAvailableToDelete: (activeChat?.created_by === user?.id) && (!!activeChat) });
  }

  initChildren() {
    this.children = {
      ...this.children,
      addUser: new Button({
        text: 'Добавить пользователя',
        type: 'button',
        events: {
          click: () => {
            Store.set({ isOpenAddUserModal: true });
            Store.set({ isOpenHeaderMenuModal: false });
          },
        },
      }),
      deleteUser: new Button({
        text: 'Удалить пользователя',
        type: 'button',
        events: {
          click: () => {
            Store.set({ isOpenDeleteUserModal: true });
          },
        },
      }),
      deleteChat: new Button({
        text: 'Удалить чат',
        type: 'button',
        events: {
          click: () => {
            chatsActions.deleteChatById();
          },
        },
      }),
    };
  }

  protected render() {
    return this.compile(tpl, this.props);
  }
}

export const getChatHeaderMenu = (props?: { isAvailableToDelete?: boolean }) => connectWithStore('div', ChatHeaderMenuBase, (state) => {
  const { activeChat, user } = state;
  return { activeChat, user };
}, props);
