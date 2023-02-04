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
    change?: (e: InputEventType) => unknown;
    input?: (e: InputEventType) => unknown;
  },
  pattern?: string,
  textError?: string
}

export class Textarea extends Block {
  isValid: boolean;

  valueState: string;

  constructor(props: TextareaProps) {
    super(
      'div',
      {
        class: `${s.wrapper} ${styles.getClassWithPrefix(s, 'wrapper', props.stylePrefix || '')}`,
        events: {
          input: (e: InputEventType) => {
            this.checkInputValidity(e);
            this.valueState = e.target.value;
          },
          change: (e: InputEventType) => {
            this.isValid = true;
            const attrValue = this.isValid ? 'false' : 'true';
            this.addAttribute({ 'data-error': attrValue });
          },
        },
        error: props.textError || '',
        ...props,
      },
    );
    this.isValid = true;
    this.valueState = '';
  }

  checkInputValidity(e?: InputEventType) {
    const regexp = new RegExp(this.props.pattern);
    this.isValid = e ? regexp.test(e.target.value) : false;
    const attrValue = this.isValid ? 'false' : 'true';
    this.addAttribute({ 'data-error': attrValue });
  }

  get value() {
    return this.valueState;
  }

  protected render() {
    return this.compile(tpl, this.props);
  }
}
