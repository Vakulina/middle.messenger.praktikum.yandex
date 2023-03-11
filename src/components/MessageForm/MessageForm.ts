import tpl from './tpl.hbs';
import  s from './style.module.scss';
import { Button } from '../Button';
import { Textarea } from '../Textarea';
import { BtnEventType, VALIDATION_REGEXES } from '../../utiles';
import { Image } from '../Image';
import clip from '../../../static/clip.svg';
import arrow from '../../../static/arrow.svg';
import { FileInput } from '../FileInput';
import { Form } from '../Form';
import { chatsActions } from '../../actions/ChatsActions';

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
    change: () => console.log('Выбрать файл'),
  },
  name: 'clipBtn',
  accept: 'video/*, image/*',
});

export class MessageForm extends Form {
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
      const { message } = this.getValues() as { message: string };
      chatsActions.sendMessage(message);
      const form = this.getContent() as HTMLFormElement;
      form.reset();
    }
  }

  protected render() {
    return this.compile(tpl, this.props);
  }
}
