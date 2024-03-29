import tpl from './tpl.hbs';
import s from './style.module.scss';
import styles from '../../utiles/styles';
import Block from '../../services/Block';
import { InputEventType } from '../../utiles';

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
  pattern?: string;
  textError?: string;
  events?: {
    change?: (e: InputEventType) => unknown;
    input?: (e: InputEventType) => unknown;
  }
  name?: string
}

export class Input extends Block {
  isValid: boolean;

  valueState: string;

  constructor({
    type = 'text',
    stylePrefix = null,
    autofocus = null,
    events,
    ...otherProps
  }: InputProps) {
    super(
      'fieldset',
      {
        class: otherProps.class ? `${otherProps.class}`
          : `${s.field} ${styles.getClassWithPrefix(s, 'field', stylePrefix)}`,
        type,
        events: {
          input: (e: InputEventType) => {
            this.isValid = true;
            const attrValue = this.isValid ? 'false' : 'true';
            this.addAttribute({ 'data-error': attrValue });
            this.valueState = e.target.value;
          },
          change: (e: InputEventType) => {
            this.checkInputValidity(e);
          },
        },
        autofocus,
        error: otherProps.textError || 'Ошибка ввода',
        ...otherProps,
      },
    );
    this.isValid = true;
    this.valueState = this.props.value || '';
  }

  checkInputValidity(e?: InputEventType) {
    const regexp = new RegExp(this.props.pattern);
    this.isValid = e ? regexp.test(e.target.value) : false;
    const attrValue = !this.isValid;
    this.addAttribute({ 'data-error': attrValue });
  }

  get value() {
    return this.valueState;
  }

  protected render() {
    return this.compile(tpl, this.props);
  }
}
