import tpl from './tpl.hbs';
import { Form } from '~src/components/form';
import { Button } from '~src/components/button';
import { Input } from '~src/components/input';

export class PasswordTemplate extends Form {
  initChildren() {
    this.children = {
      ...this.children,
      old_password: new Input({
        name: 'old_password', label: 'Текущий пароль', placeholder: '*******', stylePrefix: 'setting', type: 'password',
      }),
      new_password: new Input({
        name: 'new_password', label: 'Новый пароль', placeholder: '', stylePrefix: 'setting', type: 'password',
      }),
      repeated_password: new Input({
        name: 'repeated_password', label: 'Повторите пароль', placeholder: '', stylePrefix: 'setting', type: 'password',
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
