import tpl from './tpl.hbs';
import s from './style.module.scss';
import styles from '../../utiles/styles';

const button = ({ id, text, stylePrefix = null }) => {
	return tpl({
		id,
		text,
		class: s.button,
		stylePrefix: styles.getClassWithPrefix(s, 'button', stylePrefix),
	});
};
export default button;