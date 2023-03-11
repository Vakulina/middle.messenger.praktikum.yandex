import tpl from './tpl.hbs';
import s from './style.module.scss';
import Block from '../../services/Block';
import { Link } from '../Link';
import { routes } from '../../utiles/constants';

interface ServerErrorProps {
  code: string,
  message: string,
}

export class ServerError extends Block {
  constructor({
    ...props
  }: ServerErrorProps) {
    super(
      'section',
      {
        class: s.error,
        ...props,
      },
    );
  }
  protected initChildren(): void {
    this.children = {
      ...this.children,
      link: new Link({ href: routes.chats, text: 'Назад к чатам' })
    }
  }

  protected render() {
    return this.compile(tpl, this.props);
  }
}
