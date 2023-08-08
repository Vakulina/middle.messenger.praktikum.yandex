import Store from '../../services/Store'
import tpl from './tpl.hbs';
import { Form, FormProps } from '../Form';
import { Button } from '../Button';
import { Input } from '../Input';
import { BtnEventType } from '../../utiles';
import { chatsActions } from '../../actions/ChatsActions';
import s from './style.module.scss';
import cross from '../../../static/cross.svg';
import { Image } from '../Image';

type titleDataType = { titleInput: string };

export class NewChatPopup extends Form {
  constructor(props: FormProps) {
    super('form', {
      title: 'Вход',
      class: s.newChat,
      ...props,
    });
  }

  initChildren() {
    this.children = {
      ...this.children,
      button: new Button({
        text: 'Создать',
        type: 'submit',
        stylePrefix: 'submit',
        events: {
          click: (e) => {
            this.submit(e);
          },
        },
      }),

      closeButton: new Button({
        text: new Image({
          src: cross,
          stylePrefix: 'cross',
        }),
        stylePrefix: 'cross',
        type: 'button',
        events: {
          click: () => {
            Store.set({ isOpenAddNewChatModal: false });
          },
        },
        name: 'sendMessage',
      }),

      titleInput: new Input({
        name: 'title',
        label: 'Введите название нового чата',
        autofocus: true,
      }),
    };
  }

  private async submit(e: BtnEventType) {
    e.preventDefault();

    const isValidValues = (_data: {} | titleDataType): _data is titleDataType => {
      return this.validateForm();
    };

    const data = this.getValues();
    if (isValidValues(data)) {
      const { titleInput } = data;
      await chatsActions.createChat({ title: titleInput });
      await chatsActions.getChats();
    }
  }

  render(): DocumentFragment {
    return this.compile(tpl, this.props);
  }
}
