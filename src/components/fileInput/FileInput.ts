import tpl from './tpl.hbs';
import s from './style.module.scss';
import Block from '../../services/Block';
import { InputEventType } from '../../utiles';
import styles from '../../utiles/styles';
import Store from '../../services/Store';

interface FileInputProps {
  label?: string,
  stylePrefix?: string | null,
  accept?: string,
  value?: string,
  events?: {
    change?: (e: InputEventType) => unknown;
    input?: (e: InputEventType) => unknown;
  }
  name?: string,
  type?: 'file',
  fileName?: string,
  text?:string | Block
}

export class FileInput extends Block {
  constructor({
    type = 'file',
    stylePrefix = null,
    text = 'Обзор...',
    events = {
      change: (e) => {
        if (e.target.files) this.setProps({ fileName: e.target.files[0]!.name });
        if (e.target.files) this.setProps({ file: e.target.files[0] });
        Store.set({ avatar: e.target.files![0] });
        this.eventBus().emit(Block.EVENTS.FLOW_CDU);
      },
    },
    ...otherProps
  }: FileInputProps) {
    super(
      'fieldset',
      {
        type,
        text,
        style: s,
        class: !stylePrefix ? s.fileInput : `${s.fileInput} ${styles.getClassWithPrefix(s, 'fileInput', stylePrefix)}`,
        events,
        ...otherProps,
      },
    );
  }

  protected render() {
    return this.compile(tpl, this.props);
  }
}
