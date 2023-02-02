import tpl from './tpl.hbs';

import style from './style.module.scss';
import { Link } from '../../components/link';
import { ChatSidebar } from '../../components/chatSidebar';
import { items } from './constants';
import { Message } from '~src/components/message';

/*
const profileTemplateLink = new Link({ href: '/setting', text: 'Профиль &#62', stylePrefix: 'profile' });

const content = tpl({
  chatItem, class: style, link: profileTemplateLink, message,
});

const chatHistory = () => pageLayout(content);
*/

const message = new Message()
export const getChats = () => new Message()


