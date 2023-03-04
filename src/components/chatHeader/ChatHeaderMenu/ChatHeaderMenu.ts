import tpl from './tpl.hbs';
import * as s from "./style.module.scss";
import Block from '~src/services/Block';
import { Button } from '~src/components/button';
import connectWithStore from '~src/services/connectWithStore'
import { chatsActions } from '~src/actions/ChatsActions';
import Store from '~src/services/Store';

export class ChatHeaderMenuBase extends Block {
  constructor(tag = 'div', {
    activeChat,
    user,
    isAvailableToDelete,
    ...props }: any
  ) {
    super(tag, {
      activeChat,
      isAvailableToDelete,
      user,
      class: s.menu,
      ...props
    });
    this.setProps({isAvailableToDelete: (activeChat?.created_by === user?.id)&&(!!activeChat)})
  }

  initChildren() {
  
    this.children = {
      ...this.children,
      addUser: new Button({
        text: 'Добавить пользователя',
        type: 'button',
        events: {
          click: (e) => {
            Store.set({isOpenAddUserModal:true})
            Store.set({isOpenHeaderMenuModal:false})
          },
        },
      }),
      deleteUser: new Button({
        text: 'Удалить пользователя',
        type: 'button',
        events: {
          click: (e) => {
            console.log('delete user')
          },
        },
      }),
      deleteChat: new Button({
        text: 'Удалить чат',
        type: 'button',
        events: {
          click: (e) => {
             chatsActions.deleteChatById()
          },
        },
      })
    }
  }

  protected render() {
    return this.compile(tpl, this.props);
  }
}

export const getChatHeaderMenu = (props?: { isAvailableToDelete?: boolean }) => connectWithStore('div', ChatHeaderMenuBase, (state) => {
  const { activeChat,  user } = state;
  return { activeChat,  user }
}, props)
