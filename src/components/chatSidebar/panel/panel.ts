import tpl from './tpl.hbs';
import s from '../style.module.scss';
import Block from '~src/services/Block';
import { Link } from '~src/components/link';
import { Search } from '~src/components/search';

export class Panel extends Block {
  constructor() {
    super('div', { class: s.panel, })
  }
  initChildren() {
    this.children = {
      ...this.children,
      link: new Link({  href: '/setting', text: 'Профиль &#62', stylePrefix: 'profile'}),
      search: new Search({        
        placeholder : 'Поиск',
        name:'search',})
    }
  }
  protected render() {
    return this.compile(tpl, this.props);
  }
}
