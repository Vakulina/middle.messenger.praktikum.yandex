import tpl from './tpl.hbs';
import { Form} from '../../form';
import { Button } from '../../button';
import { BtnEventType } from '~src/utiles';
import connectWithStore from '~src/services/connectWithStore';
import cross from '../../../../static/cross.svg';
import { Image } from '../../image';
import Store from '~src/services/Store';
import { chatsActions } from '~src/actions/ChatsActions';
import { getUsersList } from './utiles';


class DeleteUserPopupBase extends Form {
  constructor(tag = 'form', {usersOfActiveChat=[],...props}: any) {
    super(tag, {
      title: 'Удалить пользователей из чата',
      stylePrefix: 'popup',
      usersOfActiveChat,
      ...props,
    })
  }

  initChildren() {
    this.children = {
      ...this.children,
      users: getUsersList(this.state?.usersOfActiveChat||[]),
      button: new Button({
        text: 'Удалить выбранных пользователей',
        type: 'button',
        stylePrefix: 'submit',
        events: {
          click: (e) => {
            this.submit(e);
          },
        },
      }),
      closeButton: new Button({
        text: new Image({
          src: cross,
          stylePrefix: 'cross',
        }),
        stylePrefix: 'cross',
        type: 'button',
        events: {
          click: () => {
            Store.set({ isOpenDeleteUserModal: false })
          }
        },
        name: 'sendMessage',
      }),
    };


  }
  protected getCheckboxesValues() {
    const form = this.getContent()
    const checkboxes = form?.querySelectorAll('input');
    const checkboxesValues: number[] = [];

    checkboxes?.forEach((input) => {
      if (input.checked) {
        checkboxesValues.push(Number(input.value));
      }
    });
    return checkboxesValues
  }

  private async submit(e: BtnEventType) {
    e.preventDefault();
    const data = this.getCheckboxesValues()
    console.log(data)
    chatsActions.deleteUsersFromChat(data)
  }

  render(): DocumentFragment {
    return this.compile(tpl, this.props);
  }
}

export const deleteUserPopup =  connectWithStore('form', DeleteUserPopupBase, (state) => {
  const { activeChat, isOpenDeleteUserModal, usersOfActiveChat } = state;
  return { activeChat, isOpenDeleteUserModal, usersOfActiveChat }
})

