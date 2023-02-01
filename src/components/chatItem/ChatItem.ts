import tpl from './tpl.hbs';
import s from './style.module.scss';
import styles from '../../utiles/styles';
import Block from '~src/services/Block';


interface ChatItemProps {
  name: string,
  text: string,
  time: string | Date,
  count?: number,
  avatar?: Block,
  stylePrefix?: string | null,
  events?: {
    click: (e?: Event) => void;
  },
}

export class ChatItem extends Block {
  constructor({
    stylePrefix = null,
    events = {
      click: () => {
        console.log('Выбран чат!')
      }
    },
    ...otherProps
  }: ChatItemProps) {
    super('div',
      {
        class: s.chatItem, stylePrefix: styles.getClassWithPrefix(s, 'chatItem', stylePrefix),

        events,
        ...otherProps
      })
  }
  protected render() {
    return this.compile(tpl, this.props);
  }
}
