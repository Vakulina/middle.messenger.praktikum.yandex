import tpl from './tpl.hbs';
//import input from '../input';
import { Button } from '../button';
//import link from '../link';
import styles from '../../utiles/styles';
//import fileInput from '../fileInput';
import s from './style.module.scss';
import Block from '~src/services/Block';

/*const renderInput = (item) => {
  if (item.type === 'file') {
    return fileInput(item);
  }

  return input(item);
};*/
type FormProps = {
  title?: string,
  stylePrefix?: string | null,
  image?: any,
  class?: string
}
export class Form extends Block {

  constructor(props: FormProps) {
    super('form', props);
    this.setProps({
      class: `${s.form} ${styles.getClassWithPrefix(s, 'form', this.props.stylePrefix)}`,
    })
  }

  protected render() {
    return this.compile(tpl, this.props);
  }
}
