import tpl from './tpl.hbs';
import * as s from "./style.module.scss";
import Block from '~src/services/Block';
import { InputEventType } from '~src/utiles';
import styles from '~src/utiles/styles';

interface FileInputProps {
  label?: string,
  stylePrefix?: string | null,
  accept: string,
  value?: string,
  events?: {
    change?: (e: InputEventType) => unknown;
    input?: (e: InputEventType) => unknown;
  }
  name?: string,
  type?: 'file',
  fileName?: string,
  text:string | Block
}

export class FileInput extends Block {
  constructor({
    type = 'file',
    stylePrefix = null,
    text = 'Обзор...',
    events = {
      change: (e) => {
       /* if (e.target.files) this.setProps({ fileName: e.target.files[0]!.name });
        if (e.target.files) this.setProps({ file: e.target.files[0]});
        this.eventBus().emit(Block.EVENTS.FLOW_CDU);*/
      },
    },
    ...otherProps
  }: FileInputProps) {
    super(
      'fieldset',
      {
        type,
        text,
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
