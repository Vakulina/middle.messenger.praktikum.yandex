import tpl from './tpl.hbs';
import { Form } from '~src/components/form';
import { Button } from '~src/components/button';
import { Input } from '~src/components/input';

export class RegistrationInfoTemplate extends Form {
  initChildren() {
    this.children = {
      ...this.children,
      first_name: new Input({
        name: 'first_name', label: 'Имя', placeholder: 'Виктория', stylePrefix: 'setting',
      }),
      second_name: new Input({
        name: 'second_name', label: 'Фамилия', placeholder: 'Яковлева', stylePrefix: 'setting',
      }),
      login: new Input({
        name: 'login', label: 'Логин', placeholder: 'v.yakovleva', stylePrefix: 'setting',
      }),
      display_name: new Input({
        name: 'display_name', label: 'Имя в чате', placeholder: 'Вакулина', stylePrefix: 'setting',
      }),
      email: new Input({
        name: 'email', label: 'Почта', placeholder: 'pochta@yandex.ru', type: 'mail', stylePrefix: 'setting',
      }),
      phone: new Input({
        name: 'phone', type: 'text', label: 'Телефон', placeholder: '+7(918) 5000000', stylePrefix: 'setting',
      }),
      password: new Input({
        name: 'password', label: 'Пароль', type: 'password', autocomplete: 'off', stylePrefix: 'setting',
      }),
      button: new Button({ text: 'Сохранить', stylePrefix: 'save', type: 'submit' }),
    };
  }

  render(): DocumentFragment {
    return this.compile(tpl, this.props);
  }
}

const form = new RegistrationInfoTemplate({ title: 'Личные данные', stylePrefix: 'tabs' });

export const registrationInfoTemplate = form;
