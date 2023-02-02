import tpl from './tpl.hbs';
import { Link } from '~src/components/link';
import Block, { PropsType } from '~src/services/Block';
import s from './style.module.scss';

export class Navigation extends Block {
  constructor(props: PropsType) {
    super(
      'nav',
      {
        class: s.nav,
        ...props,
      },
    );
  }

  render(): DocumentFragment {
    return this.compile(tpl, this.props);
  }
}
const navigation = new Navigation({
  chats: new Link({ href: './chats', text: 'Список чатов' }),
  chat: new Link({ href: './chat', text: 'Лента переписки' }),
  setting: new Link({ href: './setting', text: 'Настройки профиля' }),
  'sign-in': new Link({ href: './sign-in', text: 'Авторизация' }),
  'sign-up': new Link({ href: '/sign-up', text: 'Регистрация' }),
  'not-found': new Link({ href: './not-found', text: '404' }),
  error: new Link({ href: './error', text: 'Ошибка сервера' }),
});

export const getNavigationPage = () => {
  return navigation;
};
