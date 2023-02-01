import tpl from './tpl.hbs';
import style from './style.module.scss';
import link from '../link';

const tabs = (config) => {
  const { pathname } = window.location;
  const activeLink = config.filter((tab) => pathname.includes(tab.pathRoute))[0]?.pathRoute || config[0]?.pathRoute;
  
  const links = config.map((tab) => link({
    href: tab.pathRoute, text: tab.name, stylePrefix: 'tabs', active: (tab.pathRoute === activeLink) ? 'active' : null,
  })).join('');
  const activeTab = config.filter((tab) => tab.pathRoute === activeLink)[0];
  const content = activeTab?.content;

  return tpl({ content, links, class: style.tabs });
};

export default tabs;
