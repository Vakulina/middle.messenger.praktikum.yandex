import tpl from './tpl.hbs';
import s from './style.module.scss';
import styles from '../../utiles/styles';
import Block from 'src/services/Block';

interface ButtonProps {
  text: string;
  stylePrefix?: string | null,
  type?: string,
  events: {
    click: () => void;
  },
}

export class Button extends Block {
  constructor({
    text,
    stylePrefix = null,
    type = 'submit',
    events = { click: () => { console.log("click") } }
  }: ButtonProps) {
    super('button',
      {
        text,
        stylePrefix: styles.getClassWithPrefix(s, 'button', stylePrefix),
        type,
        class: s.button,
        events
      })
  }
  protected render() {
    return this.compile(tpl, this.props);
  }
}
