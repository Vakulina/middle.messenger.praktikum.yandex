import tpl from './tpl.hbs';
import { Link } from '~src/components/link';
import Block, { ChildrenType } from '~src/services/Block';
import * as s from './style.module.scss';
import { routes } from '~src/utiles/constants';

export class Navigation extends Block {
  constructor(props: ChildrenType) {
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
  chats: new Link({ href: routes.chats, text: 'Список чатов' }),
  setting: new Link({ href: routes.setting, text: 'Настройки профиля' }),
  'sign-in': new Link({ href: routes.authorization, text: 'Авторизация' }),
  'sign-up': new Link({ href: routes.registration, text: 'Регистрация' }),
  'not-found': new Link({ href: routes.notFound, text: '404' }),
  error: new Link({ href: routes.serverError, text: 'Ошибка сервера' }),
});

export const getNavigationPage = () => {
  return navigation;
};
