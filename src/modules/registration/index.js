import tpl from './tpl.hbs';
import pageLayout from '../../components/pageLayout';
import form, { Form } from '../../components/form';
import style from './style.module.scss';

const inputList = [
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
