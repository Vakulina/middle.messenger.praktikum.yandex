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
  inputList?: any,
  buttonList?: Button[],
  linkList?: any,
  title?: string,
  stylePrefix?: string | null,
  image?: any,
}
export class Form extends Block {
  constructor({
    inputList = [],
    buttonList = [],
    linkList = [],
    title = 'Заголовок формы',
    stylePrefix = null,
    image = null,
  }: FormProps) {
    super('form', { inputList, buttonList, linkList, title, stylePrefix: styles.getClassWithPrefix(s, 'form', stylePrefix), image })
  }
  protected render() {
    return this.compile(tpl, this.props);
  }
}
/*const form = () => {
  const inputs = inputList ? inputList.map((item) => renderInput(item)).join('') : null;

  const buttons = buttonList ? buttonList.map((item) => new Button(item)).join('') : null;
  const links = linkList ? linkList.map((item) => link(item)).join('') : null;
  return tpl({
    inputs,
    buttons,
    links,
    class: s.form,
    title,
    stylePrefix: styles.getClassWithPrefix(s, 'form', stylePrefix),
    image,
  });
};*/


