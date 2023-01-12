import tpl from './tpl.hbs';
import s from './style.module.scss';

const message = () => {
	return tpl({ class: s.input});
};

export default message;
