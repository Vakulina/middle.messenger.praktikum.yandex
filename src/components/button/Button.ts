import tpl from './tpl.hbs';
import s from './style.module.scss';
import styles from '../../utiles/styles';
import Block from '~src/services/Block';


interface ButtonProps {
  text: string;
  stylePrefix?: string | null,
  type?: string,
  events?: {
    click: (e: Event) => void;
  },
  name?: string
}

export class Button extends Block {
  constructor({
    stylePrefix = null,
    type = 'submit',
    events = {
      click: (e) => {
        e.preventDefault();
        console.log("click")
      }
    },
    ...otherProps
  }: ButtonProps) {
    super('button',
      {
        type,
        class: `${s.button} ${styles.getClassWithPrefix(s, 'button', stylePrefix)}`,
        events,
        ...otherProps
      })
  }
  protected render() {
    return this.compile(tpl, this.props);
  }
}

