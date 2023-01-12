import tpl from './tpl.hbs';
import s from './style.module.scss';
import styles from '../../utiles/styles';

const link = ({ href, text, stylePrefix = null, active=null }) => {
	return tpl({ href, text, class: s.link, stylePrefix: styles.getClassWithPrefix(s, 'link', stylePrefix), active });
};

export default link;
