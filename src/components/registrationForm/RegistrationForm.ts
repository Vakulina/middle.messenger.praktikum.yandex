import tpl from './tpl.hbs';
import { Form } from '../form';
import { Button } from '../button';
import { Input } from '../input';
import { Link } from '../link';

export class RegistrationForm extends Form {
  initChildren() {
    this.children = {
      ...this.children,
      'first_name': new Input({ name: 'first_name', label: 'Имя', placeholder: 'Виктория', autofocus:true }),
      'second_name': new Input({ name: 'second_name', label: 'Фамилия', placeholder: 'Яковлева' , autofocus: false}),
      'login': new Input({ name: 'login', label: 'Логин', placeholder: 'v.yakovleva' }),
      'email': new Input({ name: 'email', label: 'Почта', placeholder: 'pochta@yandex.ru', type: 'mail', }),
      'phone': new Input({ name: 'phone', type: 'text', label: 'Телефон', placeholder: '+7(918) 5000000' }),
      'password': new Input({ name: 'password', label: 'Пароль', type: 'password', autocomplete: 'off' }),
      'repeated_password': new Input({ name: 'repeated_password', label: 'Повторите пароль', type: 'password', autocomplete: 'off' }),
      'sign-up': new Button({ text: 'Создать аккаунт', type: 'submit', stylePrefix: 'submit' }),
      'sign-in': new Link({ href: '/sign-in', text: 'Войти' }),
    }
  }
  render(): DocumentFragment {
    return this.compile(tpl, this.props);
  }
}
