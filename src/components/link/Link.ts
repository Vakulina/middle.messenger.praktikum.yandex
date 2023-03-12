import tpl from './tpl.hbs';
import s from './style.module.scss';
import styles from '../../utiles/styles';
import Block from '../../services/Block';
import { PropsWithRouter, withRouter } from '../../hocs/withRouter';

interface LinkProps extends PropsWithRouter {
  href: string,
  text: string,
  stylePrefix?: string | null,
  active?: boolean,
}

class LinkBase extends Block {
  constructor({
    stylePrefix = null,
    ...props
  }: LinkProps) {
    super(
      'button',
      {
        class: `${s.link} ${styles.getClassWithPrefix(s, 'link', stylePrefix)}`,
        events: {
          click: () => this.navigate(),
        },
        ...props,
      },
    );
  }

protected initChildren(): void {
    this.children = {
      ...this.children,
      router:this.props.router
    }
}

  navigate() {
    this.children.router.go(this.props.href);
  }

  protected render() {
    return this.compile(tpl, this.props);
  }
}
export const Link = withRouter(LinkBase);
