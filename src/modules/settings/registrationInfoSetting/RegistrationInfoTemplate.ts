import tpl from './tpl.hbs';
import { Form } from '~src/components/form';
import { Button } from '~src/components/button';
import { Input } from '~src/components/input';
import { BtnEventType, VALIDATION_REGEXES } from '~src/utiles';

export class RegistrationInfoTemplate extends Form {
  initChildren() {
    this.children = {
      ...this.children,
      first_name: new Input({
        name: 'first_name',
        label: 'Имя',
        placeholder: 'Виктория',
        stylePrefix: 'setting',
        pattern: VALIDATION_REGEXES.name[0],
        textError: VALIDATION_REGEXES.name[1]
      }),
      second_name: new Input({
        name: 'second_name',
        label: 'Фамилия',
        placeholder: 'Яковлева',
        stylePrefix: 'setting',
        pattern: VALIDATION_REGEXES.name[0],
        textError: VALIDATION_REGEXES.name[1]
      }),
      login: new Input({
        name: 'login',
        label: 'Логин',
        placeholder: 'Yakovleva',
        stylePrefix: 'setting',
        pattern: VALIDATION_REGEXES.login[0],
        textError: VALIDATION_REGEXES.login[1]
      }),
      display_name: new Input({
        name: 'display_name', label: 'Имя в чате', placeholder: 'Вакулина', stylePrefix: 'setting',
      }),
      email: new Input({
        name: 'email',
        label: 'Почта',
        placeholder: 'pochta@yandex.ru',
        type: 'mail',
        stylePrefix: 'setting',
        pattern: VALIDATION_REGEXES.email[0],
        textError: VALIDATION_REGEXES.email[1]
      }),
      phone: new Input({
        name: 'phone',
        type: 'text',
        label: 'Телефон',
        placeholder: '+7(918) 5000000',
        stylePrefix: 'setting',
        pattern: VALIDATION_REGEXES.phone[0],
        textError: VALIDATION_REGEXES.phone[1]
      }),
      button: new Button({
        text: 'Сохранить', stylePrefix: 'save', type: 'submit',
        events: {
          click: (e) => {
            this.submit(e);
          },
        },
      }),
    };
  }
  private submit(e: BtnEventType) {
    e.preventDefault();
    if (this.validateForm()) console.log(this.getValues());
  }

  render(): DocumentFragment {
    return this.compile(tpl, this.props);
  }
}

const form = new RegistrationInfoTemplate({ title: 'Личные данные', stylePrefix: 'tabs' });

export const registrationInfoTemplate = form;
