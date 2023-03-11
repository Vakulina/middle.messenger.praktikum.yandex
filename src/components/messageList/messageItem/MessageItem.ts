import tpl from './tpl.hbs';
import Block from '../../../services/Block';
import { MessageType } from '../../../services';
import  s from '../style.module.scss';

export class MessageItem extends Block {
  constructor({ is_read, ...props }: Omit<MessageType, 'file' | 'type'>) {
    super(
      'li',
      {
        class: s.message,
        ...props,
      },
    );
    this.addAttribute({ 'data-isread': !!is_read });
  }

  protected render() {
    return this.compile(tpl, this.props);
  }
}
