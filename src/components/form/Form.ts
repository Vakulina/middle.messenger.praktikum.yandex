import tpl from './tpl.hbs';
import styles from '../../utiles/styles';
import * as s from './style.module.scss';
import Block from '~src/services/Block';
import { Input } from '../input';
import { Textarea } from '../textarea';
import { AuthData, RegistrationValuesType, UserDTO } from '~src/api/AuthApi';
import { ChangePasswordType } from '~src/api/UsersApi';

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
  serverError: string | null;

  constructor(tag:string, props: FormProps) {
    super(tag = 'form', {
      class: `${s.form} ${styles.getClassWithPrefix(s, 'form', props?.stylePrefix || '')}`,
      className: s.form,
      ...props,
    });
    this.serverError = null;
  }

  protected getValues(): AuthData | RegistrationValuesType | ChangePasswordType | UserDTO | {} {
    return Object.entries(this.children).reduce((acc, [key, child]) => {
      if ((child instanceof Input) || (child instanceof Textarea)) {
        /* eslint-disable no-param-reassign */
        acc = { ...acc, [key]: child.value };
      }
      return acc;
    }, {});
  }

  protected validateForm():boolean {
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
