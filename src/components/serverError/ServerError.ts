import tpl from './tpl.hbs';
import s from './style.module.scss';
import Block from '../../services/Block';
import { Link } from '../Link';
import { routes } from '../../utiles/constants';
import connectWithStore from '../../services/connectWithStore';

interface ServerErrorProps {
  code: string,
  message: string,
  href?: string
}

export class ServerErrorBase extends Block {
  constructor(tag = 'section', {
    ...props
  }: ServerErrorProps) {
    super(
      tag,
      {
        class: s.error,
        ...props,
      },
    );
  }
  protected initChildren(): void {
    this.children = {
      ...this.children,
      link: new Link({
        href: this.state?.user?.id ? routes.chats : routes.authorization,
        text: this.state?.user?.id ? 'Назад к чатам' : 'Назад'
      })
    }
  }

  protected render() {
    return this.compile(tpl, this.props);
  }
}

export const serverError = (props: Partial<ServerErrorProps>) => connectWithStore('section', ServerErrorBase, (state) => {
  const {  user } = state;
  return {  user };
},
  props);
