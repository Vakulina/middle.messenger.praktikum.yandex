import tpl from './tpl.hbs';
import styles from '../../utiles/styles';
import * as s from "./style.module.scss";
import Block from '~src/services/Block';
import { Input } from '../input';
import { Textarea } from '../textarea';
import { AuthData, RegistrationValuesType } from '~src/api/Auth';
import Store from '~src/services/Store';
import { ChangePasswordType } from '~src/api/Users';

export type FormProps = {
  title?: string,
  stylePrefix?: string | null,
  image?: any,
  class?: string,
  events?: {
    focusin?: () => void;
    focusout?:()=>void
  }
};
export abstract class Form extends Block {
  serverError: string | null
  constructor(props: FormProps) {
    super('form', {
      class: s.form ? s.form : `${s.form} ${styles.getClassWithPrefix(s, 'form', props?.stylePrefix || '')}`,
      className: s.form,
      ...props,
    })
    this.serverError = null
  }

  protected getValues(): AuthData | RegistrationValuesType |ChangePasswordType| {} {
    return Object.entries(this.children).reduce((acc, [key, child]) => {

      if ((child instanceof Input) || (child instanceof Textarea)) {
        /* eslint-disable no-param-reassign */
        acc = { ...acc, [key]: child.value };
      }
      return acc;
    }, {});
  }

  protected validateForm() {
    return Object.entries(this.children).reduce((acc, [_, child]) => {
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
