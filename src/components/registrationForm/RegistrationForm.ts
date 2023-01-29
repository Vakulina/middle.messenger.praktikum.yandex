import tpl from './tpl.hbs';
import { Form } from '../form';
import { Button } from '../button';
import { Input } from '../input';

export class RegistrationForm extends Form {
  initChildren() {
    this.children = {
      ...this.children,
      'first_name': new Input({ name: 'first_name', label: 'Имя', placeholder: 'Виктория' }),
      'second_name': new Input({ name: 'second_name', label: 'Фамилия', placeholder: 'Яковлева' }),
      'login': new Input({ name: 'login', label: 'Логин', placeholder: 'v.yakovleva' }),
      'email': new Input({ name: 'email', label: 'Почта', placeholder: 'pochta@yandex.ru', type: 'mail', }),
      'phone': new Input({ name: 'phone', type:'text', label: 'Телефон', placeholder: '+7(918) 5000000' }),
      'password': new Input({ name: 'password', label: 'Пароль', type: 'password', autocomplete: 'off' }),
      'repeated_password': new Input({ name: 'repeated_password', label: 'Повторите пароль', type: 'password', autocomplete: 'off' }),
 
      'sign-up': new Button({ text: 'Вход', type: 'submit', stylePrefix: 'submit' }),
    }
  }
  render(): DocumentFragment {
    return this.compile(tpl, this.props);
  }
}
/*const inputList = [
  { name: 'first_name', label: 'Имя', placeholder: 'Виктория' },
  { name: 'second_name', label: 'Фамилия', placeholder: 'Яковлева' },
  { name: 'login', label: 'Логин', placeholder: 'v.yakovleva' },
  {
    name: 'email', label: 'Почта', placeholder: 'pochta@yandex.ru', type: 'mail',
  },
  { name: 'phone', label: 'Телефон', placeholder: '+7(918) 5000000' },
  { name: 'password', label: 'Пароль', type: 'password' },
  { name: 'repeated_password', label: 'Повторите пароль', type: 'password' },
];

const buttonList = [
  { id: 'sign-up', text: 'Создать аккаунт', stylePrefix: 'submit' },
];
const linkList = [
  { href: '/sign-in', text: 'Войти' },
];
const authForm = new Form({
  inputList, buttonList, linkList, title: 'Регистрация',
});
//const content = tpl({ form: authForm, class: style.registration });

const registration = () => authForm;

export default registration;
*/
