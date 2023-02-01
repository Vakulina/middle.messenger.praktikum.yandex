import tpl from './tpl.hbs';
import s from './style.module.scss';
import Block from '~src/services/Block';


interface ChatSidebarProps {
  items: Block[],
}

export class ChatSidebar extends Block {
  constructor(
    props
      : ChatSidebarProps) {
    super('sidebar',
      {
        class: s.sidebar,
        ...props
      })
  }
  protected render() {
    return this.compile(tpl, this.props);
  }
}


/*import tpl from './tpl.hbs';
import pageLayout from '../../components/pageLayout';
import chatItem from '../../components/chatItem';
import message from '../../components/message';
import link, { Link } from '../../components/link';
import style from './style.module.scss';

const profileTemplateLink = new Link({ href: '/setting', text: 'Профиль &#62', stylePrefix: 'profile' });

const content = tpl({
  chatItem, class: style, link: profileTemplateLink, message,
});

const chatSelection = () => pageLayout(content);

export default chatSelection;*/
