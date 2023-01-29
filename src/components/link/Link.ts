import tpl from './tpl.hbs';
import s from './style.module.scss';
import styles from '../../utiles/styles';
import Block from '~src/services/Block';

interface LinkProps {
  href: string,
  text: string,
  stylePrefix?: string|null,
  active?:boolean,
}

export class Link extends Block {
  constructor({
    stylePrefix=null,
    ...otherProps
  }: LinkProps) {
    super('a',
      {
        class: `${s.link} ${styles.getClassWithPrefix(s, 'link', stylePrefix)}`,
        ...otherProps
      })
  }
  protected render() {
    return this.compile(tpl, this.props);
  }
}
