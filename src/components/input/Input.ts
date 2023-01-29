import tpl from './tpl.hbs';
import s from './style.module.scss';
import styles from '../../utiles/styles';
import Block from '~src/services/Block';

interface InputProps {
  label?: string,
  placeholder? : string,
  stylePrefix?: string | null,
  type?: string,
  accept?: string,
  autocomplete?:string,
  value?: string,
  autofocus?:boolean,
  events?: {
    blur?: (event: FocusEvent & { target: HTMLInputElement }) => unknown;//при потере фокуса
    focus?: (event: FocusEvent & { target: HTMLInputElement }) => unknown;//при фокусировке
    change?: (e: InputEvent) => unknown; //произойдет при потере фокуса
    input?: (e: InputEvent) => unknown;
  }
  name?: string
}

export class Input extends Block {
  constructor({
    type = 'text',
    stylePrefix=null,
    events = {
      input: (e) => {
        console.log(e.target)
      }
    },
    ...otherProps
  }: InputProps) {
    super('fieldset',
      {
        type,
        class: `${s.field} ${styles.getClassWithPrefix(s, 'field', stylePrefix)}`,
        events,
        ...otherProps
      })
  }
  protected render() {
    return this.compile(tpl, this.props);
  }
}
