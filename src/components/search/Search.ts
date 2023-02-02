import tpl from './tpl.hbs';
import s from './style.module.scss';
import Block from '~src/services/Block';
import { Input } from '../input';

export class Search extends Block {
  constructor() {
    super('div',
      { class: s.search__wrapper})
  }
  initChildren() {
    this.children = {
      ...this.children,
      'input': new Input({
        placeholder : 'Поиск',
        stylePrefix: 'search',
        events: {
          input: (e) => {
            console.log(e.target)
          }
        },
        name: 'search'})
    }
  }
  protected render() {
    return this.compile(tpl, this.props);
  }
}
