import tpl from './tpl.hbs';
import s from '../style.module.scss';
import Block from '~src/services/Block';
import { Link } from '~src/components/link';
import { Search } from '~src/components/search';

export class Panel extends Block {
  constructor() {
    super('div', { class: s.panel, })
  }
  initChildren() {
    this.children = {
      ...this.children,
      link: new Link({  href: '/setting', text: 'Профиль &#62', stylePrefix: 'profile'}),
      search: new Search()
    }
  }
  protected render() {
    return this.compile(tpl, this.props);
  }
}

/*import tpl from './tpl.hbs';
import pageLayout from '~src/components/pageLayout';
import message from '~src/components/message';
import link from '~src/components/link';
import style from '../style.module.scss';

const profileTemplateLink = link({ href: '/setting', text: 'Профиль &#62', stylePrefix: 'profile' });

const content = tpl({
  chatItem, class: style, link: profileTemplateLink, message,
});

const chatSelection = () => pageLayout(content);

export default chatSelection;*/
