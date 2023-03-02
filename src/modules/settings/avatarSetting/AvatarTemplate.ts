import UsersActions from '~src/actions/UsersActions';
import { Button } from '~src/components/button';
import {avatarInput } from '~src/components/avatarInput';
import { Form, FormProps } from '~src/components/form';
import { avatarImage } from '~src/components/avatarImage';
import Block from '~src/services/Block';
import connectWithStore from '~src/services/connectWithStore';
import { BtnEventType } from '~src/utiles';

import tpl from './tpl.hbs';
import Store from '~src/services/Store';

export class AvatarTemplateBase extends Form {
  constructor(tag:string, props: FormProps) {
    super(tag = 'section', {

      events: {
        focusin: () => {
          if (this.state.isAuthError) {
            Store.set({ isAuthError: null });
            this.addAttribute({ 'data-server-error': 'false' });
          }
        },
      },
      ...props,
    });
  }


  initChildren() {
    this.children = {
      ...this.children,
      image: avatarImage,
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
