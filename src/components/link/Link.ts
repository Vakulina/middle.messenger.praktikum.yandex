import tpl from './tpl.hbs';
import s from './style.module.scss';
import styles from '../../utiles/styles';
import Block from '../../services/Block';
import { withRouter } from '../../hocs/withRouter';
import { router } from '../../services/Router';

interface LinkProps {
  href: string,
  text: string,
  stylePrefix?: string | null,
  active?: boolean,
  router?: typeof router
}

class LinkBase extends Block {
  constructor({
    stylePrefix = null,
 
    ...props
  }: LinkProps) {
    super(
      'span',
      {
        class: `${s.link} ${styles.getClassWithPrefix(s, 'link', stylePrefix)}`,

        events: {
          click: () => this.navigate(),
        },
        ...props,
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
