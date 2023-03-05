import tpl from './tpl.hbs';
import * as s from "./style.module.scss";
import { Button } from '../button';
import { Textarea } from '../textarea';
import { BtnEventType, InputEventType, VALIDATION_REGEXES } from '~src/utiles';
import { Image } from '../image';
import clip from '../../../static/clip.svg';
import arrow from '../../../static/arrow.svg';
import { FileInput } from '../fileInput';
import { Form } from '../form';
import Store from '~src/services/Store';
import { chatsActions } from '~src/actions/ChatsActions';

const message = new Textarea({
  name: 'message',
  autofocus: true,
  pattern: VALIDATION_REGEXES.message[0],
  textError: VALIDATION_REGEXES.message[1],
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

export class Message extends Form {
  constructor() {
    super('form', {
      class: `${s.message}`,
    });
  }

  initChildren() {
    this.children = {
      ...this.children,
      addFileInput,
      message,
      sendMessage: new Button({
        text: new Image({
          src: arrow,
          stylePrefix: 'arrow',
        }),
        stylePrefix: 'withArrow',
        type: 'button',
        events: {
          click: (e) => {
            this.submit(e);
          },
        },
        name: 'sendMessage',
      }),
    };
  }

  private submit(e: BtnEventType) {
    e.preventDefault();
    if (this.validateForm()) {
      const { message } = this.getValues() as { message: string }

      chatsActions.sendMessage(message)

      const form = this.getContent() as HTMLFormElement
      form.reset()

    }

  }

  protected render() {
    return this.compile(tpl, this.props);
  }
}
