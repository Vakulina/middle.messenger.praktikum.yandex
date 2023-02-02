import tpl from './tpl.hbs';
import s from './style.module.scss';
import Block from '~src/services/Block';
import { Button } from '../button';
import { Textarea } from '../textarea';
import { InputEventType } from '~src/utiles';
import { Image } from '../image';
import clip from '../../../static/clip.svg'
import { FileInput } from '../fileInput';

const textarea = new Textarea({
  name: 'message',
  class: s.textarea,
  events: {
    blur: (e: InputEventType) => console.log(`Отправим сообщение ${e.target.value}`)
  }
})

const addFileInput = new FileInput({
  text: new Image({
    src: clip,
    alt: 'Добавить вложение',
    stylePrefix: 'clip',
  }),
  stylePrefix: 'clip',
  type: 'file',
  events: {
    change: (e: InputEventType) => console.log('Выбрать файл')
  },
  name: 'clipBtn',
  accept:'video/*, image/*'
})

export class Message extends Block {
  constructor() {
    super('form', {
      class: s.message,
      textareaName: 'message',
    })
  }
  initChildren() {
    this.children = {
      ...this.children,
      addFileInput,
     // 'sendMessage': new Button({}),
      textarea
    }
  }
  protected render() {
    return this.compile(tpl, this.props);
  }
}


