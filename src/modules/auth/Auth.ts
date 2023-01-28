import tpl from './tpl.hbs';
import { Form } from '../../components/form';
import style from './style.module.scss';
import { Button } from '../../components/button';
//import styles from '../../utiles/styles';

const inputList = [
  { name: 'login', label: 'Логин', placeholder: 'v.yakovleva' },
  { name: 'password', label: 'Пароль', type: 'password' },
];
const linkList = [
  { href: '/sign-up', text: 'Нет аккаунта?' },
];



//const authForm = new Form({ ...buttonList, title: 'Вход', class: style.auth, stylePrefix: 'auth' });


//const content = tpl({ form: authForm, class: style.auth });

/*
const auth = () => {
  return pageLayout(content);
};*/




export class Auth extends Form {
  initChildren() {

    this.children = {
      ...this.children,
      button: new Button({ text: 'Вход', type: 'submit', stylePrefix: 'submit', })
    }
  }


  render(): DocumentFragment {
    return this.compile(tpl, this.props);
  }
}

export const auth = () => {
  return new Auth({ title: 'Вход', class: style.auth, stylePrefix: 'auth' })
}
