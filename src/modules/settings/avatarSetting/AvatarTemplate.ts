import { Button } from '~src/components/button';
import { FileInput } from '~src/components/fileInput';
import { Form } from '~src/components/form';
import { Image } from '~src/components/image';
import avatar from '../../../../static/avatar.jpg';
import tpl from './tpl.hbs';

// TODO организовать обновления изображения синхронно с выбором файл. предположительно брать src из глобального стейта

export class AvatarTemplate extends Form {
  initChildren() {
    this.children = {
      ...this.children,
      image: new Image({ alt: 'аватар', stylePrefix: 'avatar', src: avatar }),
      avatar: new FileInput({
        name: 'avatar', 
        type: 'file', 
        accept: 'image/*', 
        text: 'Обзор...',
      }),
      'save-avatar': new Button({ text: 'Сохранить', stylePrefix: 'save-avatar', type: 'submit' }),
    };
  }

  render(): DocumentFragment {
    return this.compile(tpl, this.props);
  }
}

const form = new AvatarTemplate({ title: 'Аватар', stylePrefix: 'tabs' });

export const avatarTemplate = form;