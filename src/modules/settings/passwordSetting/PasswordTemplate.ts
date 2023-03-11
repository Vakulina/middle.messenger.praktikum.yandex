import tpl from './tpl.hbs';
import { Form, FormProps } from '../../../components/Form';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { BtnEventType, getPasswordValidation, VALIDATION_REGEXES } from '../../../utiles';
import { VALIDATION_ERROR } from '../../../utiles/constants';
import Store from '../../../services/Store';
import connectWithStore from '../../../services/connectWithStore';
import Block from '../../../services/Block';
import UsersActions from '../../../actions/UsersActions';
import { ChangePasswordType } from '../../../api/UsersApi';

export class PasswordTemplateBase extends Form {
  constructor(props: FormProps) {
    Store.set({ isPasswordSettingsError: null });
    super('fildeset', {
      events: {
        focusin: () => {
          this.addAttribute({ 'data-password-error': 'false' });
          this.addAttribute({ 'data-server-error': 'false' });
          this.addAttribute({ 'data-success': 'false' });
          if (this.state.isPasswordSettingsError) {
            Store.set({ isPasswordSettingsError: null });
          }
        },
      },
      title: 'Пароль',
      ...props,
    });
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
      password: new Input({
        name: 'password',
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

  private async submit(e: BtnEventType) {
    e.preventDefault();
    document.querySelector('form')?.blur();
    const isValid = this.validateForm();
    const data = this.getValues() as ChangePasswordType;
    if (isValid) {
      const { oldPassword, password } = data;
      await UsersActions.changePassword(oldPassword, password);
      this.addAttribute({ 'data-server-error': this.props.isPasswordSettingsError ? 'true' : 'false' });
      this.addAttribute({ 'data-success': this.props.isPasswordSettingsError ? 'false' : 'true' });
      if (this.state.isPasswordSettingsError) this.setProps({ serverError: `Ошибка сервера: ${this.state.isPasswordSettingsError!.message}` });
    }
  }

  protected validateForm() {
    const values = this.getValues();
    this.addAttribute({ 'data-password-error': 'false' });

    if (!getPasswordValidation(values)) {
      this.addAttribute({ 'data-password-error': 'true' });
      this.setProps({ serverError: 'Ошибка ввода паролей!' });
      return false;
    }

    return super.validateForm();
  }

  render(): DocumentFragment {
    return this.compile(tpl, this.props);
  }
}

export const passwordTemplate = connectWithStore(
  'form',
  PasswordTemplateBase as typeof Block,
  (state) => {
    const { user, isLogin, isPasswordSettingsError } = state;
    return { user, isLogin, isPasswordSettingsError };
  },
  { title: 'Безопасность', stylePrefix: 'tabs' },
);
