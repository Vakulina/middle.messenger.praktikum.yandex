import tpl from './tpl.hbs';
import input from '../input';
import button from '../button';
import link from '../link';
import styles from '../../utiles/styles';
import fileInput from '../fileInput';
import s from './style.module.scss';

const renderInput = (item) => {
  if (item.type === 'file') {
    return fileInput(item);
  }

  return input(item);
};

const form = ({
  inputList,
  buttonList,
  linkList,
  title = 'Заголовок формы',
  stylePrefix = null,
  image = null,
}) => {
  const inputs = inputList ? inputList.map((item) => renderInput(item)).join('') : null;
  const buttons = buttonList ? buttonList.map((item) => button(item)).join('') : null;
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
};

export default form;
