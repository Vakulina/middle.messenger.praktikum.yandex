import UsersActions from '~src/actions/UsersActions';
import { Button } from '~src/components/button';
import { avatarInput } from '~src/components/avatarInput';
import { Form } from '~src/components/form';
import { Image } from '~src/components/image';
import Block from '~src/services/Block';
import connectWithStore from '~src/services/connectWithStore';
import { BtnEventType } from '~src/utiles';
import avatar from '../../../../static/avatar.jpg';
import tpl from './tpl.hbs';

// TODO организовать обновления изображения синхронно с выбором файл. предположительно брать src из глобального стейта

export class AvatarTemplateBase extends Form {
  initChildren() {
    this.children = {
      ...this.children,
      image: new Image({ alt: 'аватар', stylePrefix: 'avatar', src: avatar }),

      avatar: avatarInput,
      'save-avatar': new Button({
        text: 'Сохранить',
        stylePrefix: 'save-avatar',
        type: 'submit',
        events: {
          click: (e) => {
            this.submit(e);
          },
        },
      }),
    };
  }

  private async submit(e: BtnEventType) {
    e.preventDefault();


    UsersActions.changeAvatar()
  }

  //public async changeAvatar(file: File) {

  render(): DocumentFragment {
    return this.compile(tpl, this.props);
  }
}

export const avatarTemplate = connectWithStore('form', AvatarTemplateBase as typeof Block,
  (state) => {
    const { avatar } = state;
    return { avatar }
  },
  { title: 'Аватар', stylePrefix: 'tabs' }
)
