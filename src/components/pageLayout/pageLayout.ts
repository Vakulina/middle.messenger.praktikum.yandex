import tpl from './tpl.hbs';
import style from './style.module.scss';
import Block, { ChildrenType, PropsType } from '~src/services/Block';

export class PageLayout extends Block {
  constructor(props:PropsType | ChildrenType) {
    super('page', {
      class: style.page,
      ...props,
    });
  }

  render(): DocumentFragment {
    return this.compile(tpl, this.props);
  }
}
