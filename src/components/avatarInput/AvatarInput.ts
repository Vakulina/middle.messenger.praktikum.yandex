import tpl from './tpl.hbs';
import * as s from "./style.module.scss";
import Block from '~src/services/Block';
import { InputEventType } from '~src/utiles';
import styles from '~src/utiles/styles';
import Store from '~src/services/Store';
import connectWithStore from '~src/services/connectWithStore';

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
class AvatarInputBase extends Block {
  fileName: any;

  constructor({
    type = 'file',
    stylePrefix = null,
    text = 'Обзор...',
    events = {
      change: (e) => {
        if (e.target.files) Store.set({ avatarName: e.target.files[0]!.name });
        Store.set({ avatar: e.target.files![0] })       
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
        accept: 'image/*',
        ...otherProps,
      },
    );

  }

  protected render() {
    return this.compile(tpl, this.props);
  }
}

export const avatarInput = connectWithStore('fieldset', AvatarInputBase as typeof Block,
  (state) => {
    const { avatar, avatarName } = state;
    return { avatar, avatarName }
  },

)
