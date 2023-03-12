import tpl from './tpl.hbs';
import { Link } from '../../components/Link';
import Block, { ChildrenType } from '../../services/Block';
import  s from './style.module.scss';
import { routes } from '../../utiles/constants';

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
 linkComponent: new Link({ href: routes.registration, text: 'Нет аккаунта?', stylePrefix: 'profile' })
});

export const getNavigationPage = () => {
  return navigation;
};
