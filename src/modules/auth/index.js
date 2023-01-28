import tpl from './tpl.hbs';
import pageLayout from '../../components/pageLayout';
import form, { Form } from '../../components/form';
import style from './style.module.scss';

const inputList = [
  { name: 'login', label: 'Логин', placeholder: 'v.yakovleva' },
  { name: 'password', label: 'Пароль', type: 'password' },
];

const buttonList = [
  {  text: 'Вход', stylePrefix: 'submit' },
];

const linkList = [
  { href: '/sign-up', text: 'Нет аккаунта?' },
];

const authForm = new Form({
  inputList, buttonList, linkList, title: 'Вход',
});
//const content = tpl({ form: authForm, class: style.auth });
console.log(authForm)
const auth = () => authForm;

export default auth;
