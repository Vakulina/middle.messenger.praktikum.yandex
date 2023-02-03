import tpl from './tpl.hbs';
import { Form } from '../form';
import { Button } from '../button';
import { Input } from '../input';
import { Link } from '../link';
import { VALIDATION_REGEXES } from '~src/utiles';
import { VALIDATION_ERROR } from '~src/utiles/constants';

const loginInput = new Input({
  name: 'login',
  label: 'Логин',
  placeholder: 'Yakovleva',
  autofocus: true,
  pattern: VALIDATION_REGEXES.login[0],
  textError: VALIDATION_REGEXES.login[1]
});


const passwordInput = new Input({
  name: 'password',
  label: 'Пароль',
  type: 'password',
  autocomplete: 'on',
  pattern: VALIDATION_REGEXES.password[0],
  textError: VALIDATION_ERROR.UNCORRECT_PASSWORD
})

export class AuthForm extends Form {
  initChildren() {
    this.children = {
      ...this.children,
      button: new Button({ text: 'Вход', type: 'submit', stylePrefix: 'submit' }),
      login: loginInput,
      password: passwordInput,
      link: new Link({ href: '/sign-up', text: 'Нет аккаунта?' }),
    };
  }

  render(): DocumentFragment {
    return this.compile(tpl, this.props);
  }
}
