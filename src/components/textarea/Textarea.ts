import tpl from './tpl.hbs';
import s from './style.module.scss';
import styles from '../../utiles/styles';
import Block from '~src/services/Block';
import { InputEventType } from '~src/utiles';

interface TextareaProps {
  name: string
  label?: string,
  placeholder?: string,
  stylePrefix?: string | null,
  class?: string,
  value?: string,
  autofocus?: boolean | null,
  events?: {
    blur?: (e: InputEventType) => unknown;
    focus?: (e: InputEventType) => unknown;
    change?: (e: InputEventType) => unknown;
    input?: (e: InputEventType) => unknown;
  }
}

export class Textarea extends Block {
  constructor({
    events = {
      input: (e) => {
        console.log(e.target.value);
      },
    },
    ...otherProps
  }: TextareaProps) {
    super(
      'div',
      {
        class: `${s.wrapper} ${styles.getClassWithPrefix(s, 'wrapper', otherProps.stylePrefix || '')}`,
        events,
        ...otherProps,
      },
    );
  }

  protected render() {
    return this.compile(tpl, this.props);
  }
}
