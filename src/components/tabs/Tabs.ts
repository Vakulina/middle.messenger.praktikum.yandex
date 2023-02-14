import tpl from './tpl.hbs';
import styles from '../../utiles/styles';
import * as s from "./style.module.scss";
import Block, { ChildrenType } from '~src/services/Block';
import { Link } from '../link/Link';

type TabsProps = {
  tabsConfig: Tab[],
  globalListerners?: Array<{ targetElement: HTMLElement, event: Event, action: (e: Event) => void }>,
  rootPathname: string,
  stylePrefix?: string
};
export type Tab = {
  name: string,
  content: Block | ChildrenType,
  pathRoute: string,
};

// TODO перенести логику роутинга в Routes, который планируется в 3 спринте
export class Tabs extends Block {
  pathname: string;

  protected currentTab: string;

  protected activeLink: string;

  protected currentPathname: Location;

  constructor({ globalListerners, rootPathname, ...otherProps }: TabsProps) {
    super('div', {
      globalListerners,
      rootPathname,
      class: `${s.tabs} ${styles.getClassWithPrefix(s, 'tabs', otherProps.stylePrefix || '')}`,
      ...otherProps,
    });
  }

  initChildren() {
    const currentPathname = window.location.pathname;
    const activeLink = this.children.tabsConfig.filter((tab: Tab) => {
      return currentPathname.includes(tab.pathRoute);
    })[0]?.pathRoute || this.children.tabsConfig[0]?.pathRoute;

    const links = this.children.tabsConfig.map((tab: Tab) => {
      const newLink = new Link({
        href: tab.pathRoute,
        text: tab.name,
        stylePrefix: 'tabs',
        active: (tab.pathRoute === activeLink),
      });

      return newLink;
    });
    const activeTab = this.children.tabsConfig.filter((tab: Tab) => tab.pathRoute === activeLink)[0];
    const content = activeTab?.content;
    /* eslint-disable @typescript-eslint/naming-convention */
    const { tabsConfig: _, ...newChildren } = this.children;

    this.children = {
      ...newChildren,
      links,
      content,
    };
  }

  protected render() {
    return this.compile(tpl, this.props);
  }
}
