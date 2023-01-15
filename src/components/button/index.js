import tpl from './tpl.hbs';
import s from './style.module.scss';
import styles from '../../utiles/styles';

const button = ({ id, text, stylePrefix = null, type = 'submit' }) => {
	return tpl({
		id,
		text,
		class: s.button,
		stylePrefix: styles.getClassWithPrefix(s, 'button', stylePrefix),
		type
	});
};
export default button;
