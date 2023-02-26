import tpl from './tpl.hbs';
import { Form, FormProps } from '~src/components/form';
import { Button } from '~src/components/button';
import { Input } from '~src/components/input';
import { BtnEventType, VALIDATION_REGEXES } from '~src/utiles';
import connectWithStore from '~src/services/connectWithStore';
import Block from '~src/services/Block';
import UsersActions from '~src/actions/UsersActions';

export class RegistrationInfoTemplateBase extends Form {
  constructor(props: FormProps) {
    super({ title: 'Личные данные', ...props });
    this.setProps({
      user: () => this.state.user,
    });
  }

  initChildren() {
    this.children = {
      ...this.children,
      first_name: new Input({
        name: 'first_name',
        label: 'Имя',
        placeholder: 'Виктория',
        stylePrefix: 'setting',
        pattern: VALIDATION_REGEXES.name[0],
        textError: VALIDATION_REGEXES.name[1],
        value: this.state.user?.first_name
      }),
      second_name: new Input({
        name: 'second_name',
        label: 'Фамилия',
        placeholder: 'Яковлева',
        stylePrefix: 'setting',
        pattern: VALIDATION_REGEXES.name[0],
        textError: VALIDATION_REGEXES.name[1],
        value: this.state.user?.second_name
      }),
      login: new Input({
        name: 'login',
        label: 'Логин',
        placeholder: 'Yakovleva',
        stylePrefix: 'setting',
        pattern: VALIDATION_REGEXES.login[0],
        textError: VALIDATION_REGEXES.login[1],
        value: this.state.user?.login
      }),
      display_name: new Input({
        name: 'display_name', label: 'Имя в чате', placeholder: 'Укажите имя в чате', stylePrefix: 'setting',
        value: this.state.user?.display_name
      }),
      email: new Input({
        name: 'email',
        label: 'Почта',
        placeholder: 'pochta@yandex.ru',
        type: 'mail',
        stylePrefix: 'setting',
        pattern: VALIDATION_REGEXES.email[0],
        textError: VALIDATION_REGEXES.email[1],
        value: this.state.user?.email
      }),
      phone: new Input({
        name: 'phone',
        type: 'text',
        label: 'Телефон',
        placeholder: '+7(918) 5000000',
        stylePrefix: 'setting',
        pattern: VALIDATION_REGEXES.phone[0],
        textError: VALIDATION_REGEXES.phone[1],
        value: this.state.user?.phone
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

  private async submit(e: BtnEventType) {
    e.preventDefault();
    const isValid = this.validateForm()
    const data = this.getValues();
    if (isValid) {
      await UsersActions.updateUserProfile(data)
      this.addAttribute({ 'data-server-error': this.props.isRegistrationSettingsError ? 'true' : 'false' });
      if (this.state.isRegistrationSettingsError) {
        this.setProps({ serverError: `Ошибка сервера: ${this.state.isRegistrationSettingsError!.message}` })
      }
      
    }
  }

  render(): DocumentFragment {
    return this.compile(tpl, this.props);
  }
}

export const registrationInfoTemplate = connectWithStore('form', RegistrationInfoTemplateBase as typeof Block,
  (state) => {
    const { user, isLogin, isRegistrationSettingsError } = state;
    return { user, isLogin, isRegistrationSettingsError }
  },
  { title: 'Личные данные', stylePrefix: 'tabs' }
)
