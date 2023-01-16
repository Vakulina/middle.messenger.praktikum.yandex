import tpl from './tpl.hbs';
import s from './style.module.scss';

const error = ({ code, message, link }) => tpl({
  code, message, link, class: s.error,
});
export default error;
