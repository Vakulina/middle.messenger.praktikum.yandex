import tpl from './tpl.hbs';
import style from './style.module.scss';

const pageLayout = (content, className = null) => {
	return tpl({ content, class: className? `${style.page} ${s[className]}` : style.page});
};

export default pageLayout;