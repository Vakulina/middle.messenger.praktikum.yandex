import tpl from './tpl.hbs';
import * as s from "./style.module.scss";
import styles from '../../utiles/styles';
import Block from '~src/services/Block';

interface ChatItemProps {
  id: number,
  name: string,
  text: string,
  time: string | Date,
  count?: number,
  avatar?: Block,
  stylePrefix?: string | null,
  events?: {
    click: (e?: Event) => void;
  },
  isActive: boolean,
}

export class ChatItem extends Block {
  constructor({
    stylePrefix = null,
    events = {
      click: () => {
        console.log('Выбран чат!');
      },
    },
    isActive = false,
    ...otherProps
  }: ChatItemProps) {

    super(
      'div',
      {
        class:s.chatItem,
        events,
        ...otherProps,
      },
    );
    this.addAttribute({'active': isActive})
  }

  protected render() {
    return this.compile(tpl, this.props);
  }
}
