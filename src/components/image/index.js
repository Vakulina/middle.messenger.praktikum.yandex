import tpl from './tpl.hbs';
import s from './style.module.scss';
import styles from '../../utiles/styles';

export default ({ url, alt, stylePrefix = null }) => {
	return tpl({
		url,
		alt,
		class: s.image,
		stylePrefix: styles.getClassWithPrefix(s, 'image', stylePrefix),
	});
}
