import tpl from './tpl.hbs';
import { Form, FormProps } from '~src/components/form';
import { Button } from '~src/components/button';
import { Input } from '~src/components/input';
import { BtnEventType, VALIDATION_REGEXES } from '~src/utiles';
import { VALIDATION_ERROR } from '~src/utiles/constants';
import Store from '~src/services/Store';
import connectWithStore from '~src/services/connectWithStore';
import Block from '~src/services/Block';

export class PasswordTemplateBase extends Form {
  constructor(props:FormProps){
    super({      events: {
      focusin: () => {
        this.addAttribute({ 'data-password-error': 'false' });
        if (this.state.isPasswordSettingsError) {
          this.addAttribute({ 'data-server-error': 'false' });
          Store.set({ isPasswordSettingsError: null })
        }
      },
    },
  ...props})
  }
  initChildren() {
    this.children = {
      ...this.children,
      oldPassword: new Input({
        name: 'oldPassword',
        label: 'Текущий пароль',
        placeholder: 'Введите текущий пароль',
        stylePrefix: 'setting',
        type: 'password',
        pattern: VALIDATION_REGEXES.password[0],
        textError: VALIDATION_ERROR.UNCORRECT_PASSWORD,
      }),
      newPassword: new Input({
        name: 'newPassword',
        label: 'Новый пароль',
        placeholder: '',
        stylePrefix: 'setting',
        type: 'password',
        pattern: VALIDATION_REGEXES.password[0],
        textError: VALIDATION_REGEXES.password[1],
      }),
      repeated_password: new Input({
        name: 'repeated_password',
        label: 'Повторите пароль',
        placeholder: '',
        stylePrefix: 'setting',
        type: 'password',
        pattern: VALIDATION_REGEXES.password[0],
        textError: VALIDATION_REGEXES.password[1],
      }),
      button: new Button({
        text: 'Сохранить',
        stylePrefix: 'save',
        type: 'submit',
        events: {
          click: (e) => {
            this.submit(e);
          },
        },
      }),
    };
  }

  private submit(e: BtnEventType) {
    e.preventDefault();
    if (this.validateForm()) console.log(this.getValues());
  }

  render(): DocumentFragment {
    return this.compile(tpl, this.props);
  }
}

export const passwordTemplate = connectWithStore('form', PasswordTemplateBase as typeof Block,
  (state) => {
    const { user, isLogin, isRegistrationSettingsError } = state;
    return { user, isLogin, isRegistrationSettingsError }
  },
  { title: 'Безопасность', stylePrefix: 'tabs' }
)
