import tpl from './tpl.hbs';
import { Form, FormProps } from '../../form';
import { Button } from '../../button';
import { Input } from '../../input';
import { BtnEventType, VALIDATION_REGEXES } from '~src/utiles';
import connectWithStore from '~src/services/connectWithStore';
import cross from '../../../../static/cross.svg';
import { Image } from '../../image';
import Store from '~src/services/Store';

const loginInput = new Input({
  name: 'login',
  label: 'Логин',
  placeholder: 'Введите логин пользователя',
  autofocus: true,
  pattern: VALIDATION_REGEXES.login[0],
  textError: VALIDATION_REGEXES.login[1],
});

class AddUserPopupBase extends Form {
  constructor(tag='form', props: FormProps) {
    super(tag, {
     title: 'Добавить пользователя в чат', 
     stylePrefix:'popup',
      events: {
        focusin: () => {
          if (this.state.isServerError) {
            this.addAttribute({ 'data-server-error': 'false' });
          }
        },
      },
      ...props,
    })
  }


  initChildren() {
    this.children = {
      ...this.children,
      button: new Button({
        text: 'Добавить пользователя',
        type: 'submit',
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

  private async submit(e: BtnEventType) {
    e.preventDefault();
    const data = this.getValues()
    console.log(data)
/*
      await AuthAction.signin(data)
      this.addAttribute({ 'data-server-error': this.props.isAuthError ? 'true' : 'false' });
      if (this.state.isAuthError) this.setProps({ serverError: `Ошибка сервера: ${this.state.isAuthError!.message}` })*/
  }

  render(): DocumentFragment {
    return this.compile(tpl, this.props);
  }
}

export const addUserPopup = connectWithStore('form', AddUserPopupBase,  (state) => {
  const { activeChat, isOpenAddUserModal } = state;
  return { activeChat, isOpenAddUserModal}
})
