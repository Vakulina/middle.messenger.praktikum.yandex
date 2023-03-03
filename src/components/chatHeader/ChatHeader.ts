import tpl from './tpl.hbs';
import * as s from "./style.module.scss";
import Block from '~src/services/Block';
import avatar from '../../../static/avatar.jpg';
import dots from '../../../static/dots.svg';
import { Image } from '../image';
import { Button } from '../button';
import { BtnEventType } from '~src/utiles';
import connectWithStore from '~src/services/connectWithStore';

const dotsButton = new Button({
  text: new Image({
    src: dots,
    stylePrefix: 'dots',
  }),
  stylePrefix: 'withArrow',
  type: 'button',
  events: {
    click: (e: BtnEventType) => console.log('open menu'),
  },
  name: 'sendMessage',
});

export class ChatHeaderBase extends Block {
  constructor() {
    super('div', {
      class: s.header,
      avatar: new Image({ alt: 'аватар', stylePrefix: 'chatItems', src: avatar }),
      name: 'Александр',
      button: dotsButton,
    });
  }

  protected render() {
    return this.compile(tpl, this.props);
  }
}

export const chatHeader = connectWithStore('form', ChatHeaderBase as typeof Block,  (state) => {
  const { activeChat } = state;
  return { activeChat }
})
