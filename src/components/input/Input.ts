import tpl from './tpl.hbs';
import s from './style.module.scss';
import styles from '../../utiles/styles';
import Block from '~src/services/Block';
import { InputEventType } from '~src/utiles';

interface InputProps {
  label?: string,
  placeholder?: string,
  stylePrefix?: string | null,
  type?: string,
  class?: string,
  accept?: string,
  autocomplete?: string,
  value?: string,
  autofocus?: boolean | null,
  events?: {
    blur?: (e: InputEventType) => unknown;//при потере фокуса
    focus?: (e: InputEventType) => unknown;//при фокусировке
    change?: (e: InputEventType) => unknown; //произойдет при потере фокуса
    input?: (e: InputEventType) => unknown;
  }
  name?: string
}

export class Input extends Block {
  constructor({
    type = 'text',
    stylePrefix = null,
    autofocus = null,
    events = {
      input: (e) => {
        console.log(e.target.value)
      }
    },
    ...otherProps
  }: InputProps) {
    super('fieldset',
      {
        type,
        class: otherProps.class ? `${otherProps.class}` : `${s.field} ${styles.getClassWithPrefix(s, 'field', stylePrefix)}`,
        events,
        autofocus,
        ...otherProps
      })
  }
  protected render() {
    return this.compile(tpl, this.props);
  }
}
