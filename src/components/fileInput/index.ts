import tpl from './tpl.hbs';
import s from './style.module.scss';
import Block from '~src/services/Block';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

interface FileInputProps {
  label?: string,
  stylePrefix?: string | null,
  accept: string,
  value?: string,
  events?: {
    change?: (e: HTMLInputEvent) => unknown;
    input?: (e: HTMLInputEvent) => unknown;
  }
  name?: string,
  type?: 'file',
  fileName?: string
}

export class FileInput extends Block {
  constructor({
    type = 'file',
    stylePrefix = null,
    events = {
      change: (e) => {
        if (e.target.files) this.setProps({ fileName: e.target.files[0]!.name })
      }
    },
    ...otherProps
  }: FileInputProps) {
    super('fieldset',
      {
        type,
        class: s.fileInput,
        events,
        ...otherProps
      })
  }
  protected render() {
    return this.compile(tpl, this.props);
  }
}

