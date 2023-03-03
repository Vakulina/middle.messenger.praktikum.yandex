import tpl from './tpl.hbs';
import * as s from "./style.module.scss";
import Block from '~src/services/Block';
import Store from '~src/services/Store';
import connectWithStore from '~src/services/connectWithStore';

interface ChatItemProps {
  chatId: number,
  name: string,
  text: string,
  time: string | Date,
  count?: number|null,
  avatar?: Block,
  stylePrefix?: string | null,
  events?: {
    click: (e?: Event) => void;
  },
  isActive?: boolean
}

export class ChatItemBase extends Block {
  constructor(tag = 'div', {
    isActive,
    chatId,
    ...otherProps
  }: ChatItemProps) {
    super(
      tag,
      {
        class: s.chatItem,
        events: {
          click: (e: any) => {
            Store.set({ activeChat: Number(e?.currentTarget.getAttribute("data-chatid")) })
            this.eventBus().emit(Block.EVENTS.FLOW_CDU);
          },
        },
        active: isActive,
        ...otherProps,
      },
    );
    this.addAttribute({ 'data-chatid': chatId })
    // this.setProps({ isActive: Number(this.props.activeChat) === Number(this.props.chatId) })
    this.addAttribute({ 'active': String(isActive) })
  }

  protected render() {

    return this.compile(tpl, this.props);
  }
}
export const getChatItem = (props: Partial<ChatItemProps>) => connectWithStore(
  'div',
  ChatItemBase as typeof Block,
  (state) => {
    const { activeChat } = state;
    return { activeChat }
  },
  props)
