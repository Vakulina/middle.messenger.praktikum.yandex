import tpl from './tpl.hbs';
import { Form } from '~src/components/form';
import { Button } from '~src/components/button';
import { Input } from '~src/components/input';

export class AvatarTemplate extends Form {
  initChildren() {
    this.children = {
      ...this.children,
      'avatar': new Input({ name: 'avatar', stylePrefix: 'file', type: 'file', accept: 'image/*' }),
      'button': new Button({ text: 'Сохранить', stylePrefix: 'save', type: 'submit', }),
    }
  }
  render(): DocumentFragment {
    return this.compile(tpl, this.props);
  }
}


const form = new AvatarTemplate({ title: 'Аватар', stylePrefix: 'tabs', })
//const authPage = new PageLayout({ content: form })

export const avatarTemplate = form
