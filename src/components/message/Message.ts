import tpl from './tpl.hbs';
import s from './style.module.scss';
import Block from '~src/services/Block';
import { Button } from '../button';
import { Textarea } from '../textarea';
import { BtnEventType, InputEventType } from '~src/utiles';
import { Image } from '../image';
import clip from '../../../static/clip.svg';
import arrow from '../../../static/arrow.svg';
import { FileInput } from '../fileInput';

const textarea = new Textarea({
  name: 'message',
  class: s.textarea,
  events: {
    blur: (e: InputEventType) => console.log(`Отправим сообщение ${e.target.value}`),
  },
});

const addFileInput = new FileInput({
  text: new Image({
    src: clip,
    stylePrefix: 'clip',
  }),
  stylePrefix: 'clip',
  type: 'file',
  events: {
    change: (e: InputEventType) => console.log('Выбрать файл'),
  },
  name: 'clipBtn',
  accept: 'video/*, image/*',
});

const sendMessage = new Button({
  text: new Image({
    src: arrow,
    stylePrefix: 'arrow',
  }),
  stylePrefix: 'withArrow',
  type: 'button',
  events: {
    click: (e: BtnEventType) => console.log('send message'),
  },
  name: 'sendMessage',
});

export class Message extends Block {
  constructor() {
    super('form', {
      class: s.message,
      textareaName: 'message',
    });
  }

  initChildren() {
    this.children = {
      ...this.children,
      addFileInput,
      textarea,
      sendMessage,
    };
  }

  protected render() {
    return this.compile(tpl, this.props);
  }
}
