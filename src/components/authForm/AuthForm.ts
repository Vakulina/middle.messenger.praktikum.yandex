import tpl from './tpl.hbs';
import { Form, FormProps } from '../Form';
import { Button } from '../Button';
import { Input } from '../Input';
import { Link } from '../Link';
import { BtnEventType, VALIDATION_REGEXES } from '../../utiles';
import { routes, VALIDATION_ERROR } from '../../utiles/constants';
import AuthAction from '../../actions/AuthActions';
import { AuthData } from '../../api/AuthApi';
import connectWithStore from '../../services/connectWithStore';
import Store from '../../services/Store';
import Block from '../../services/Block';

const loginInput = new Input({
  name: 'login',
  label: 'Логин',
  placeholder: 'Введите логин',
  autofocus: true,
  pattern: VALIDATION_REGEXES.login[0],
  textError: VALIDATION_REGEXES.login[1],
});

const passwordInput = new Input({
  name: 'password',
  label: 'Пароль',
  type: 'password',
  placeholder: 'Введите пароль',
  autocomplete: 'on',
  pattern: VALIDATION_REGEXES.password[0],
  textError: VALIDATION_ERROR.UNCORRECT_PASSWORD,
});

const linkComponent = new Link({ href: routes.registration, text: 'Нет аккаунта?' });

class AuthFormBase extends Form {
  constructor(props: FormProps) {
    super('form', {
      title: 'Вход',
      stylePrefix: 'auth',
      events: {
        focusin: () => {
          if (this.state.isAuthError) {
            Store.set({ isAuthError: null });
            this.addAttribute({ 'data-server-error': 'false' });
          }
        },
      },

      ...props,
    });
  }

  initChildren() {
    this.children = {
      link: linkComponent,
      button: new Button({
        text: 'Вход',
        type: 'submit',
        stylePrefix: 'submit',
        events: {
          click: (e) => {
            this.submit(e);
          },
        },
      }),
      login: loginInput,
      password: passwordInput,
      ...this.children,
    };
  }

  private async submit(e: BtnEventType) {
    e.preventDefault();

    const isValidValues = (_data: {} | AuthData): _data is AuthData => {
      return this.validateForm();
    };

    const data = this.getValues();
    if (isValidValues(data)) {
      await AuthAction.signin(data);
      this.addAttribute({ 'data-server-error': this.props.isAuthError ? 'true' : 'false' });
      if (this.state.isAuthError) this.setProps({ serverError: `Ошибка сервера: ${this.state.isAuthError!.message}` });
    }
  }

  render(): DocumentFragment {
    return this.compile(tpl, this.props);
  }
}

export const AuthForm = connectWithStore('form', AuthFormBase as typeof Block, (state) => {
  const { isAuthError, isLogin } = state;
  return { isAuthError, isLogin };
});
