import tpl from './tpl.hbs';
import Block from '../../../services/Block';
import { Link } from '../../Link';
import { Search } from '../../Search';
import { routes } from '../../../utiles/constants';
import { Button } from '../../Button';
import Store from '../../../services/Store';

export class Panel extends Block {
  constructor(props:{ class:string }) {
    super('div', { class: props.class });
  }

  initChildren() {
    this.children = {
      button: new Button({
        text: 'Создать чат',
        stylePrefix: 'sidebar',
        type: 'button',
        events: {
          click: () => {
            Store.set({ activeChat: null });
            Store.set({ isOpenAddNewChatModal: true });
          },
        },
      }),
      link: new Link({ href: routes.setting, text: 'Профиль &#62', stylePrefix: 'profile' }),
      search: new Search({
        placeholder: 'Поиск',
        name: 'search',
      }),
      ...this.children,
    };
  }

  protected render() {
    return this.compile(tpl, this.props);
  }
}
