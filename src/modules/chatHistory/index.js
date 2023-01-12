import tpl from './tpl.hbs';
import pageLayout from '../../components/pageLayout'
import chatItem from '../../components/chatItem';
import message from '../../components/message';
import style from './style.module.scss';
import link from '../../components/link';

const profileTemplateLink= link({href:'/setting', text:'Профиль &#62', stylePrefix: 'profile'});

const content = tpl({ chatItem, class:style, link: profileTemplateLink, message });

export default () => {
	return pageLayout(content);
}