import tpl from './tpl.hbs';
import { Form } from '../form';
import { Button } from '../button';
import { Input } from '../input';
import { Link } from '../link';

export class AuthForm extends Form {
  initChildren() {
    this.children = {
      ...this.children,
      button: new Button({ text: 'Вход', type: 'submit', stylePrefix: 'submit' }),
      login: new Input({ name: 'login', label: 'Логин', placeholder: 'v.yakovleva', autofocus: true }),
      password: new Input({ name: 'password', label: 'Пароль', type: 'password', autocomplete: 'on' }),
      link: new Link({ href: '/sign-up', text: 'Нет аккаунта?'})
    }
  }
  render(): DocumentFragment {
    return this.compile(tpl, this.props);
  }
}
