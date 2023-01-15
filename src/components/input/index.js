import tpl from './tpl.hbs';
import s from './style.module.scss';
import styles from '../../utiles/styles';

const input = ({ name, label, placeholder = null, stylePrefix=null, type='text', accept=null, id=null }) => {
	return tpl({
		name, 
		label,
		placeholder,
		class: s.field,
		stylePrefix: styles.getClassWithPrefix(s, 'field', stylePrefix),
		type,
		accept, id
	});
};

export default input;
