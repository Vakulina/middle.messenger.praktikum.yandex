import tpl from './tpl.hbs';
import * as s from './style.module.scss';
import styles from '../../utiles/styles';
import Block from '~src/services/Block';
import { withRouter } from '~src/hocs/withRouter';

interface LinkProps {
  href: string,
  text: string,
  stylePrefix?: string | null,
  active?: boolean,
}

class LinkBase extends Block {
  constructor({
    stylePrefix = null,
    ...otherProps
  }: LinkProps) {
    super(
      'span',
      {
        class: `${s.link} ${styles.getClassWithPrefix(s, 'link', stylePrefix)}`,
        events: {
          click: () => this.navigate(),
        },
        ...otherProps,
      },
    );
  }

  navigate() {
    this.props.router!.go(this.props.href);
  }

  protected render() {
    return this.compile(tpl, this.props);
  }
}
export const Link = withRouter(LinkBase);
