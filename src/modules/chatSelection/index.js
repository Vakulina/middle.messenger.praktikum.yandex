import tpl from './tpl.hbs';
import pageLayout from '../../components/pageLayout'
import chatItem from '../../components/chatItem';
import message from '../../components/message';
import link from '../../components/link';
import style from './style.module.scss';

const profileTemplateLink = link({ href: '/setting', text: 'Профиль &#62', stylePrefix: 'profile' });

const content = tpl({ chatItem, class: style, link: profileTemplateLink, message });

const chatSelection = () => {
	return pageLayout(content);
};

export default chatSelection;