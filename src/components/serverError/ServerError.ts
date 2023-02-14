import tpl from './tpl.hbs';
import * as s from "./style.module.scss";
import Block from '~src/services/Block';
import { Link } from '../link';

interface ServerErrorProps {
  code: string, message: string, link: Link
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

  protected render() {
    return this.compile(tpl, this.props);
  }
}
