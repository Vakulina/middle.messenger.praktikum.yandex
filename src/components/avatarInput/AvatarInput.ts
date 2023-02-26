import tpl from './tpl.hbs';
import * as s from "./style.module.scss";
import Block from '~src/services/Block';
import { InputEventType } from '~src/utiles';
import styles from '~src/utiles/styles';
import connectWithStore from '~src/services/connectWithStore';
import Store from '~src/services/Store';


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
  text: string | Block
}

class AvatarInputBase extends Block {
  constructor({
    type = 'file',
    stylePrefix = null,
    text = 'Обзор...',
    events = {
      change: (e) => {
        Store.set({ avatarName: e.target.files![0].name })
        Store.set({ avatar: e.target.files![0] })
        this.setProps({fileName: e.target.files![0].name})
      },
    },
    ...otherProps
  }: FileInputProps) {
    super(
      'fieldset',
      {
        type,
        text,
        events,
        class: !stylePrefix ? s.fileInput : `${s.fileInput} ${styles.getClassWithPrefix(s, 'fileInput', stylePrefix)}`,
        ...otherProps,
      },
    );

  }
  initChildren() {

    super.initChildren()
  }

  protected render() {

    return this.compile(tpl, this.props);
  }
}

export const avatarInput = connectWithStore('fieldset', AvatarInputBase as any,
  (state) => {
    const { avatar, avatarName } = state;
    return { avatar, avatarName }
  },
  {
    name: 'avatar',
    type: 'file',
    accept: 'image/*',
    text: 'Обзор...',
  }
)
