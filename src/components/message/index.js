import tpl from './tpl.hbs';
import s from './style.module.scss';

export default () => {
	return tpl({ class: s.input});
}
