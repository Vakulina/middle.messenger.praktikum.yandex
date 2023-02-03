import tpl from './tpl.hbs';
import { Form } from '~src/components/form';
import { Button } from '~src/components/button';
import { Input } from '~src/components/input';
import { VALIDATION_REGEXES } from '~src/utiles';
import { VALIDATION_ERROR } from '~src/utiles/constants';

export class PasswordTemplate extends Form {
  initChildren() {
    this.children = {
      ...this.children,

      old_password: new Input({
        name: 'old_password',
        label: 'Текущий пароль',
        placeholder: '*******',
        stylePrefix: 'setting',
        type: 'password',
        pattern: VALIDATION_REGEXES.password[0],
        textError: VALIDATION_ERROR.UNCORRECT_PASSWORD
      }),
      new_password: new Input({
        name: 'new_password',
        label: 'Новый пароль',
        placeholder: '',
        stylePrefix: 'setting',
        type: 'password',
        pattern: VALIDATION_REGEXES.password[0],
        textError: VALIDATION_REGEXES.password[1]
      }),
      repeated_password: new Input({
        name: 'repeated_password',
        label: 'Повторите пароль',
        placeholder: '',
        stylePrefix: 'setting',
        type: 'password',
        pattern: VALIDATION_REGEXES.password[0],
        textError: VALIDATION_REGEXES.password[1]
      }),
      button: new Button({ text: 'Сохранить', stylePrefix: 'save', type: 'submit' }),
    };
  }

  render(): DocumentFragment {
    return this.compile(tpl, this.props);
  }
}

const form = new PasswordTemplate({ title: 'Безопасность', stylePrefix: 'tabs' });

export const passwordTemplate = form;
