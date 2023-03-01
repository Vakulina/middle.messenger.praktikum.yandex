import tpl from './tpl.hbs';
import { Form, FormProps } from '../form';
import { Button } from '../button';
import { Input } from '../input';
import { Link } from '../link';
import { BtnEventType, getPasswordValidation, VALIDATION_REGEXES } from '~src/utiles';
import connectWithStore from '~src/services/connectWithStore';
import AuthActions from '~src/actions/AuthActions';
import { RegistrationData, RegistrationValuesType } from '~src/api/Auth';
import Store from '~src/services/Store';
import Block from '~src/services/Block';

const first_name = new Input({
  name: 'first_name',
  label: 'Имя',
  placeholder: 'Виктория',
  autofocus: true,
  pattern: VALIDATION_REGEXES.name[0],
  textError: VALIDATION_REGEXES.name[1],
});
const second_name = new Input({
  name: 'second_name',
  label: 'Фамилия',
  placeholder: 'Яковлева',
  autofocus: false,
  pattern: VALIDATION_REGEXES.name[0],
  textError: VALIDATION_REGEXES.name[1],
});
const login = new Input({
  name: 'login',
  label: 'Логин',
  placeholder: 'v.yakovleva',
  pattern: VALIDATION_REGEXES.login[0],
  textError: VALIDATION_REGEXES.login[1],
});
const email = new Input({
  name: 'email',
  label: 'Почта',
  placeholder: 'pochta@yandex.ru',
  type: 'mail',
  pattern: VALIDATION_REGEXES.email[0],
  textError: VALIDATION_REGEXES.email[1],
});
const phone = new Input({
  name: 'phone',
  type: 'text',
  label: 'Телефон',
  placeholder: '+7(918) 5000000',
  pattern: VALIDATION_REGEXES.phone[0],
  textError: VALIDATION_REGEXES.phone[1],
});
const password = new Input({
  name: 'password',
  label: 'Пароль',
  type: 'password',
  autocomplete: 'off',
  pattern: VALIDATION_REGEXES.password[0],
  textError: VALIDATION_REGEXES.password[1],
});
const repeated_password = new Input({
  name: 'repeated_password',
  label: 'Повторите пароль',
  type: 'password',
  autocomplete: 'off',
  pattern: VALIDATION_REGEXES.password[0],
  textError: VALIDATION_REGEXES.password[1],
});

class RegistrationFormBase extends Form {
  constructor(props: FormProps) {
    super('form',{
      title: 'Регистрация', stylePrefix: 'reg',
      events: {
        focusin: () => {
          this.addAttribute({ 'data-password-error': 'false' });
          if (this.state.isRegistrationError) {
            this.addAttribute({ 'data-server-error': 'false' });
            Store.set({ isRegistrationError: null })
          }
        },
      },
      ...props,
    })
  }
  initChildren() {
    this.children = {
      ...this.children,
      'sign-up': new Button({
        text: 'Создать аккаунт',
        type: 'submit',
        stylePrefix: 'submit',
        events: {
          click: (e) => {
            this.submit(e);
          },
        },
      }),
      'sign-in': new Link({ href: '/sign-in', text: 'Войти' }),
      first_name,
      second_name,
      login,
      email,
      phone,
      password,
      repeated_password,
    };
    
  }

  private async submit(e: BtnEventType) {
    e.preventDefault();
    document.querySelector('form')?.blur()
    const isValid = this.validateForm()
    const data = this.getValues();
    if (isValid) {
      await AuthActions.signup(data as RegistrationData)
      this.addAttribute({ 'data-server-error': this.props.isRegistrationError ? 'true' : 'false' });
      if (this.state.isRegistrationError) this.setProps({ serverError: `Ошибка сервера: ${this.state.isRegistrationError!.message}` })
    }
  }

  protected validateForm() {
    const values = this.getValues();
    this.addAttribute({ 'data-password-error': 'false' });
   
    if (!getPasswordValidation(values)) {
      this.addAttribute({ 'data-password-error': 'true' });
      this.setProps({ serverError: `Ошибка ввода паролей!` })
      return false;
    }
    else {
      return super.validateForm();
    }

  }

  render(): DocumentFragment {
    return this.compile(tpl, this.props);
  }
}

export const RegistrationForm = connectWithStore('form', RegistrationFormBase as typeof Block, (state) => {
  const { user, isRegistrationError } = state;
  return { user, isRegistrationError }
}
)

