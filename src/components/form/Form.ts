import tpl from './tpl.hbs';
import styles from '../../utiles/styles';
import s from './style.module.scss';
import Block from '~src/services/Block';

type FormProps = {
  title?: string,
  stylePrefix?: string | null,
  image?: any,
  class?: string
};
export abstract class Form extends Block {
  constructor(props: FormProps) {
    super('form', {
      class: `${s.form} ${styles.getClassWithPrefix(s, 'form', props.stylePrefix||'')}`,
      ...props
    });
    this.setProps({

    });
  }

  protected render() {
    return this.compile(tpl, this.props);
  }
}
