import UsersActions from '../../../actions/UsersActions';
import { Button } from '../../../components/Button';
import { avatarInput } from '../../../components/AvatarInput';
import { Form, FormProps } from '../../../components/Form';
import { avatarImage } from '../../../components/AvatarImage';
import Block from '../../../services/Block';
import connectWithStore from '../../../services/connectWithStore';
import { BtnEventType } from '../../../utiles';

import tpl from './tpl.hbs';
import Store from '../../../services/Store';

export class AvatarTemplateBase extends Form {
  constructor(tag= 'form', props: FormProps) {
    super(tag, {
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
    UsersActions.changeAvatar();
  }

  render(): DocumentFragment {
    return this.compile(tpl, this.props);
  }
}

export const avatarTemplate = connectWithStore(
  'form',
  AvatarTemplateBase as typeof Block,
  (state) => {
    const { avatar } = state;
    return { avatar };
  },
  { title: 'Аватар', stylePrefix: 'tabs' },
);
