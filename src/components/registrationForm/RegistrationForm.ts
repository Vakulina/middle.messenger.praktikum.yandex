import tpl from './tpl.hbs';
import { Form } from '../form';
import { Button } from '../button';
import { Input } from '../input';
import { Link } from '../link';
import { BtnEventType, VALIDATION_REGEXES } from '~src/utiles';

type RegistrationValuesType = {
  password: string,
  repeated_password: string,
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  phone: string,
}

export class RegistrationForm extends Form {
  initChildren() {
    this.children = {
      ...this.children,

      first_name: new Input({
        name: 'first_name',
        label: 'Имя',
        placeholder: 'Виктория',
        autofocus: true,
        pattern: VALIDATION_REGEXES.name[0],
        textError: VALIDATION_REGEXES.name[1]
      }),
      second_name: new Input({
        name: 'second_name',
        label: 'Фамилия',
        placeholder: 'Яковлева',
        autofocus: false,
        pattern: VALIDATION_REGEXES.name[0],
        textError: VALIDATION_REGEXES.name[1]
      }),
      login: new Input({
        name: 'login',
        label: 'Логин',
        placeholder: 'v.yakovleva',
        pattern: VALIDATION_REGEXES.login[0],
        textError: VALIDATION_REGEXES.login[1]
      }),
      email: new Input({
        name: 'email',
        label: 'Почта',
        placeholder: 'pochta@yandex.ru',
        type: 'mail',
        pattern: VALIDATION_REGEXES.email[0],
        textError: VALIDATION_REGEXES.email[1]
      }),
      phone: new Input({
        name: 'phone',
        type: 'text',
        label: 'Телефон',
        placeholder: '+7(918) 5000000',
        pattern: VALIDATION_REGEXES.phone[0],
        textError: VALIDATION_REGEXES.phone[1]
      }),
      password: new Input({
        name: 'password',
        label: 'Пароль',
        type: 'password',
        autocomplete: 'off',
        pattern: VALIDATION_REGEXES.password[0],
        textError: VALIDATION_REGEXES.password[1]
      }),
      repeated_password: new Input({
        name: 'repeated_password',
        label: 'Повторите пароль',
        type: 'password',
        autocomplete: 'off',
        pattern: VALIDATION_REGEXES.password[0],
        textError: VALIDATION_REGEXES.password[1]
      }),
      'sign-up': new Button({
        text: 'Создать аккаунт', type: 'submit', stylePrefix: 'submit',
        events: {
          click: (e) => {
            this.submit(e);
          },
        },
      }),
      'sign-in': new Link({ href: '/sign-in', text: 'Войти' }),
    };
  }

  private submit(e: BtnEventType) {
    e.preventDefault();
    if (this.validateForm()) console.log(this.getValues());
  }

  validateForm() {
    const values: RegistrationValuesType = this.getValues() as RegistrationValuesType;
    const isMatchedPasswords = values.password === values.repeated_password;
    return super.validateForm() && isMatchedPasswords;
  }

  render(): DocumentFragment {
    return this.compile(tpl, this.props);
  }
}
