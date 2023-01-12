import tpl from './tpl.hbs';
import pageLayout from '../../components/pageLayout';
import form from '../../components/form';
import style from './style.module.scss';

const inputList = [
	{ name: 'login', label: 'Логин', placeholder: 'v.yakovleva' },
	{ name: 'password', label: 'Пароль', type:'password' }
];

const buttonList = [
	{ id: 'sign-in', text: 'Вход', stylePrefix: 'submit' }
];

const linkList=[
	{ href:'/sign-up', text:'Нет аккаунта?'}
]

const authForm = form({ inputList, buttonList, linkList, title: 'Вход' });
const content = tpl({ form: authForm, class: style.auth });

export default () => {
	return pageLayout(content);
}