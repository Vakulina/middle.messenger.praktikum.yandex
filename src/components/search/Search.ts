import tpl from './tpl.hbs';
import s from './style.module.scss';
import Block from '~src/services/Block';
import { InputEventType } from '~src/utiles';

interface SearchProps {
  label?: string,
  placeholder?: string,
  events?: {
    change?: (e: InputEventType) => unknown;
    input?: (e: InputEventType) => unknown;
  }
  name?: string
}

export class Search extends Block {
  constructor({
    events = {
      input: (e) => {
        console.log(e.target.value);
      },
    },
    ...otherProps
  }: SearchProps) {
    super(
      'div',
      {
        class: s.search,
        events,
        ...otherProps,
      },
    );
  }

  protected render() {
    return this.compile(tpl, this.props);
  }
}
