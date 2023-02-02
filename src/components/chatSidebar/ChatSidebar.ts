import tpl from './tpl.hbs';
import s from './style.module.scss';
import Block from '~src/services/Block';
import { Panel } from './panel';


interface ChatSidebarProps {
  items: Block[],
}

export class ChatSidebar extends Block {
  constructor(props: ChatSidebarProps) {
    super('sidebar',
      {
        class: s.sidebar,
        ...props
      })
  }
  initChildren() {
    this.children = {
      ...this.children,
      panel: new Panel()
    }
  }
  protected render() {
    return this.compile(tpl, this.props);
  }
}
