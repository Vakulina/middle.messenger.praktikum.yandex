import tpl from './tpl.hbs';
import * as s from "./style.module.scss";
import Block from '~src/services/Block';
import avatar from '../../../static/avatar.jpg';
import dots from '../../../static/dots.svg';
import { Image } from '../image';
import { Button } from '../button';
import { BtnEventType } from '~src/utiles';
import connectWithStore from '~src/services/connectWithStore'

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
  constructor(tag = 'div', {
    activeChat,
    ...props }: any
  ) {
  console.log( activeChat?.title)
    super(tag, {
      class: s.header,
      button: dotsButton,
      activeChat,
      ...props
    });
  }

  initChildren() {
    this.children = {
      ...this.children,
      avatar: new Image({
        alt: 'аватар',
        stylePrefix: 'chatItems',
        src: this.state?.activeChat?.avatar || avatar
      }),
    }
  }

  protected render() {
    return this.compile(tpl, this.props);
  }
}

export const chatHeader = connectWithStore('div', ChatHeaderBase, (state) => {
  const { activeChat } = state;
  return { activeChat }
})
