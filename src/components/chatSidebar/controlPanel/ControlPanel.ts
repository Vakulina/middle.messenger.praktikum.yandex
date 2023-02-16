import tpl from './tpl.hbs';
import * as s from "../style.module.scss";
import Block from '~src/services/Block';
import { Link } from '~src/components/link';
import { Search } from '~src/components/search';
import { routes } from '~src/utiles/constants';

export class Panel extends Block {
  constructor() {
    super('div', { class: s.panel });
  }

  initChildren() {
    this.children = {
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
