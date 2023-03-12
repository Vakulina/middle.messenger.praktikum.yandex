import tpl from './tpl.hbs';
import { Form, FormProps } from '../Form';
import { Button } from '../Button';
import { Input } from '../Input';
import { BtnEventType, VALIDATION_REGEXES } from '../../utiles';
import connectWithStore from '../../services/connectWithStore';
import cross from '../../../static/cross.svg'
import { Image } from '../Image';
import Store from '../../services/Store';
import { chatsActions } from '../../actions/ChatsActions';
import { UserDTO } from '../../api/AuthApi';
import UsersActions from '../../actions/UsersActions';

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
    });
    this.addAttribute({ 'data-after-search': 'false' });
  }

  initChildren() {
    this.children = {
      ...this.children,
      button: new Button({
        text: 'Найти пользователя',
        type: 'button',
        stylePrefix: 'search',
        events: {
          click: () => {
            this.search();
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
          click: () => {
            this.props.users = null;
            const form = this.getContent() as HTMLFormElement;
            form.reset();
            Store.set({ isOpenAddUserModal: false });
            this.addAttribute({ 'data-after-search': 'false' });
          },
        },
        name: 'sendMessage',
      }),
    };
  }

  private async search() {
    const data: UserDTO = this.getValues() as UserDTO;
    UsersActions.searchUsers(data?.login)
      .then((res) => {
        this.setProps({
          users: res,
        });
        this.addAttribute({ 'data-after-search': 'true' });
      });
  }

  protected getCheckboxesValues() {
    const form = this.getContent();
    const checkboxes = form?.querySelectorAll('input');
    const checkboxesValues: number[] = [];
    checkboxes?.forEach((input) => {
      if (input.checked) {
        checkboxesValues.push(Number(input.value));
      }
    });
    return checkboxesValues;
  }

  private async submit(e: BtnEventType) {
    e.preventDefault();
    const data = this.getCheckboxesValues();
    chatsActions.addUsersToChat(data);
  }

  render(): DocumentFragment {
    return this.compile(tpl, this.props);
  }
}

export const addUserPopup = connectWithStore('form', AddUserPopupBase, (state) => {
  const { activeChat, isOpenAddUserModal } = state;
  return { activeChat, isOpenAddUserModal };
});
