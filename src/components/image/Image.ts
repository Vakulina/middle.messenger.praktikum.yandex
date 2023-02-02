import tpl from './tpl.hbs';
import s from './style.module.scss';
import styles from '../../utiles/styles';
import Block from '~src/services/Block';

interface ImageProps {
  src?: any,
  alt?: string,
  stylePrefix: string | null,
}

export class Image extends Block {
  constructor({
    stylePrefix = null,
    alt = '',
    ...otherProps
  }: ImageProps) {
    super(
      'img',
      {
        alt,
        class: `${s.image} ${styles.getClassWithPrefix(s, 'image', stylePrefix)}`,
        ...otherProps,
      },
    );
  }

  protected render() {
    return this.compile(tpl, this.props);
  }
}
