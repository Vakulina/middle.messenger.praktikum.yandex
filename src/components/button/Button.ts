import tpl from './tpl.hbs';
import s from './style.module.scss';
import styles from '../../utiles/styles';
import Block from '~src/services/Block';


interface ButtonProps {
  text: string;
  stylePrefix?: string | null,
  type?: string,
  events?: {
    click: () => void;
  },
  name?:string
}

export class Button extends Block {
  constructor({
    text,
    stylePrefix = null,
    type = 'submit',
    events = { click: () => { console.log("click") } },
    name
  }: ButtonProps) {
    super('button',
      {
        text,
        type,
        class: `${s.button} ${styles.getClassWithPrefix(s, 'button', stylePrefix)}`,
        events
      })
  }
  protected render() {
    return this.compile(tpl, this.props);
  }
}


