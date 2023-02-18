import tpl from './tpl.hbs';
import styles from '../../utiles/styles';
import * as s from "./style.module.scss";
import Block, { ChildrenType } from '~src/services/Block';
import { Link } from '../link/Link';
import { withRouter } from '~src/hocs/withRouter';

type TabsProps = {
  tabsConfig: Tab[],
  // globalListerners?: Array<{ targetElement: HTMLElement, event: Event, action: (e: Event) => void }>,
  rootPathname: string,
  stylePrefix?: string,
  activeLink?: string
};
export type Tab = {
  name: string,
  content: Block | ChildrenType,
  pathRoute: string,
};

class TabsBase extends Block {
  pathname: string;
  protected activeLink: string;
  protected _activeLink: string;

  constructor({ activeLink, tabsConfig, rootPathname, ...otherProps }: TabsProps) {
    super('div', {
      activeLink, tabsConfig, rootPathname,
      class: `${s.tabs} ${styles.getClassWithPrefix(s, 'tabs', otherProps.stylePrefix || '')}`,
      ...otherProps,
    });
    
  }

  initChildren() {
    this._activeLink = this.props.activeLink || this.children.tabsConfig[0].pathRoute
     const links = this.children.tabsConfig.map((tab: Tab) => {
      const newLink = new Link({
        href: tab.pathRoute,
        text: tab.name,
        stylePrefix: 'tabs',
        active: (tab.pathRoute === this._activeLink),
      });

      return newLink;
    });
    const activeTab = this.children.tabsConfig.filter((tab: Tab) => tab.pathRoute === this._activeLink)[0];
    const content = activeTab? activeTab.content : this.children.tabsConfig[0].content
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
export const Tabs = withRouter(TabsBase);
