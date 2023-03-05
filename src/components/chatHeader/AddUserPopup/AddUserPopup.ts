import tpl from './tpl.hbs';
import { Form, FormProps } from '../../form';
import { Button } from '../../button';
import { Input } from '../../input';
import { BtnEventType, VALIDATION_REGEXES } from '~src/utiles';
import connectWithStore from '~src/services/connectWithStore';
import cross from '../../../../static/cross.svg';
import { Image } from '../../image';
import Store from '~src/services/Store';
import * as s from "../style.module.scss";
import { chatsActions } from '~src/actions/ChatsActions';
import { UserDTO } from '~src/api/AuthApi';
import UsersActions from '~src/actions/UsersActions';
import Block from '~src/services/Block';

const loginInput = new Input({
  name: 'login',
  label: 'Логин',
  placeholder: 'Введите логин пользователя',
  autofocus: true,
  pattern: VALIDATION_REGEXES.login[0],
  textError: VALIDATION_REGEXES.login[1],
});

class AddUserPopupBase extends Form {
  constructor(tag = 'form', props: FormProps) {
    super(tag, {
      title: 'Добавить пользователя в чат',
      stylePrefix: 'popup',
      events: {
        focusin: () => {
          if (this.state.isServerError) {
            this.addAttribute({ 'data-server-error': 'false' });
          }
        },
      },
      ...props,
    })
    this.addAttribute({ 'data-after-search': 'false' })
  }


  initChildren() {
    this.children = {
      ...this.children,
      button: new Button({
        text: 'Найти пользователя',
        type: 'button',
        stylePrefix: 'search',
        events: {
          click: (e) => {
            this.search(e);
          },
        },
      }),
      submitButton: new Button({
        text: 'Добавить пользователей',
        type: 'button',
        stylePrefix: 'submit',
        events: {
          click: (e) => {
            this.submit(e);
          },
        },
      }),
      login: loginInput,

      closeButton: new Button({
        text: new Image({
          src: cross,
          stylePrefix: 'cross',
        }),
        stylePrefix: 'cross',
        type: 'button',
        events: {
          click: (e: BtnEventType) => {
            Store.set({ isOpenAddUserModal: false })
          }
        },
        name: 'sendMessage',
      }),
    };
  }

  private async search(e: BtnEventType) {
    const data: UserDTO = this.getValues() as UserDTO
    UsersActions.searchUsers(data?.login)
      .then((res) => {
        this.setProps({
          users: res
        })
        this.addAttribute({ 'data-after-search': 'true' })
      })
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
    chatsActions.addUsersToChat(data )
 //   
  }

  render(): DocumentFragment {
    return this.compile(tpl, this.props);
  }
}

export const addUserPopup = connectWithStore('form', AddUserPopupBase, (state) => {
  const { activeChat, isOpenAddUserModal } = state;
  return { activeChat, isOpenAddUserModal }
})
