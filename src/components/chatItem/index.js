import tpl from './tpl.hbs';
import s from './style.module.scss';
import styles from '../../utiles/styles';
import avatarImg from '../../../static/avatar.jpg'

export default ({ stylePrefix = null, avatar = avatarImg }) => {
	return tpl({ class: s.chatItem, stylePrefix: styles.getClassWithPrefix(s, 'chatItem', stylePrefix), avatar });
}
