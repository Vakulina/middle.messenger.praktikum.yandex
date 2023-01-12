import tpl from './tpl.hbs';
import s from './style.module.scss';

export default ({ code, message, link }) => {
	return tpl({ code, message, link, class: s.error });
}
