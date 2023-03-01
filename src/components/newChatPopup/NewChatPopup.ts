import tpl from './tpl.hbs';
import { Form, FormProps } from '../form';
import { Button } from '../button';
import { Input } from '../input';
import { BtnEventType } from '~src/utiles';
import { chatsActions } from '~src/actions/ChatsActions';

type titleDataType = { titleInput: string }

const titleInput = new Input({
  name: 'title',
  label: 'Введите название нового чата',
  autofocus: true,
});


export class NewChatPopup extends Form {
  constructor(props: FormProps) {
    super('form', {
      title: 'Вход',
      stylePrefix: 'newChat',
      ...props,
    })
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
      titleInput,
    };
  }

  private async submit(e: BtnEventType) {
    e.preventDefault();

    const isValidValues = (_data: {} | titleDataType): _data is titleDataType => {
      return this.validateForm()
    }

    const data = this.getValues()
    if (isValidValues(data)) {
      const { titleInput } = data
      await chatsActions.createChat({ title: titleInput })
      await chatsActions.getChats()
    }
    else {
      this.setProps({ error: `Название чата не может быть пустым!` })
    }
  }

  render(): DocumentFragment {
    return this.compile(tpl, this.props);
  }
}


