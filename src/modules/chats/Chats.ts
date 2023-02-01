import tpl from './tpl.hbs';

import style from './style.module.scss';
import { Link } from '../../components/link';
import { ChatSidebar } from '../../components/chatSidebar';
import { items } from './constants';


/*
const profileTemplateLink = new Link({ href: '/setting', text: 'Профиль &#62', stylePrefix: 'profile' });

const content = tpl({
  chatItem, class: style, link: profileTemplateLink, message,
});

const chatHistory = () => pageLayout(content);
*/


export const getChats = () => new ChatSidebar({ items })


