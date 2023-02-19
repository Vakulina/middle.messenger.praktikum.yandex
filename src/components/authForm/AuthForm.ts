import tpl from './tpl.hbs';
import { Form, FormProps } from '../form';
import { Button } from '../button';
import { Input } from '../input';
import { Link } from '../link';
import { BtnEventType, VALIDATION_REGEXES } from '~src/utiles';
import { VALIDATION_ERROR } from '~src/utiles/constants';
import AuthAction from '~src/actions/AuthAction';
import { AuthData } from '~src/api/Auth';
import connectWithStore from '~src/services/connectWithStore';
import Store from '~src/services/Store';

const loginInput = new Input({
  name: 'login',
  label: 'Логин',
  placeholder: 'Yakovleva',
  autofocus: true,
  pattern: VALIDATION_REGEXES.login[0],
  textError: VALIDATION_REGEXES.login[1],
});

const passwordInput = new Input({
  name: 'password',
  label: 'Пароль',
  type: 'password',
  autocomplete: 'on',
  pattern: VALIDATION_REGEXES.password[0],
  textError: VALIDATION_ERROR.UNCORRECT_PASSWORD,
});

class AuthFormBase extends Form {
  constructor(props: FormProps) {
    super({
      events: {
        focusin: () => {
          if (this.state.isAuthError) {
            Store.set({ isAuthError: null })
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
      link: new Link({ href: '/sign-up', text: 'Нет аккаунта?' }),
    };
  }

  private async submit(e: BtnEventType) {
    e.preventDefault();

    const isValidValues = (_data: {} | AuthData): _data is AuthData => {
      return this.validateForm()
    }

    const data = this.getValues()
    if (isValidValues(data)) {
      await AuthAction.signin(data)
      this.addAttribute({ 'data-server-error': this.props.isAuthError ? 'true' : 'false' });
      if (this.state.isAuthError) this.setProps({ serverError: `Ошибка сервера: ${this.state.isAuthError!.message}` })
    }
  }

  render(): DocumentFragment {
    return this.compile(tpl, this.props);
  }
}

export const AuthForm = connectWithStore(AuthFormBase, { title: 'Вход', stylePrefix: 'auth' }, (state) => {
  const { isAuthError, isLogin } = state;
  return { isAuthError, isLogin }
})
