import tpl from './tpl.hbs';
import styles from '../../utiles/styles';
import s from './style.module.scss';
import Block from '~src/services/Block';
import { Input } from '../input';
import { Textarea } from '../textarea';

type FormProps = {
  title?: string,
  stylePrefix?: string | null,
  image?: any,
  class?: string
};
export abstract class Form extends Block {
  constructor(props: FormProps) {
    super('form', {
      class: props.class ? props.class : `${s.form} ${styles.getClassWithPrefix(s, 'form', props?.stylePrefix || '')}`,
      ...props,
    });
  }

  protected getValues() {
    return Object.entries(this.children).reduce((acc, [key, child]) => {
      if ((child instanceof Input) || (child instanceof Textarea)) {
        /* eslint-disable no-param-reassign */
        acc = { ...acc, [key]: child.value };
      }
      return acc;
    }, {});
  }

  protected validateForm() {
    return Object.entries(this.children).reduce((acc, [key, child]) => {
      if ((child instanceof Input) || (child instanceof Textarea)) {
        const isValideChild = child.isValid && (child.value !== '');
        /* eslint-disable no-param-reassign */
        acc = (acc && isValideChild);
        if (!isValideChild) child.checkInputValidity();
      }

      return acc;
    }, true);
  }

  protected render() {
    return this.compile(tpl, this.props);
  }
}
