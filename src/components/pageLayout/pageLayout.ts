import tpl from './tpl.hbs';
import style from './style.module.scss';
import Block, { ChildrenType } from '~src/services/Block';
import { PropsType } from '~src/services/Block';

export class PageLayout extends Block {
  constructor(props:PropsType|ChildrenType) {
    super('page', props);
    this.setProps({
      class: style.page,
    })
  }

  render(): DocumentFragment {
    return this.compile(tpl, this.props);
  }
}
