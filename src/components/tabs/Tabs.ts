import tpl from './tpl.hbs';
import styles from '../../utiles/styles';
import s from './style.module.scss';
import Block, { ChildrenType, PropsType } from '~src/services/Block';
import { Link } from '../link/Link';


type TabsProps = {
  tabsConfig: Tab[],
  globalListerners?: Array<{ targetElement: HTMLElement, event: Event, action: (e: Event) => void }>,
  rootPathname: string,
  stylePrefix?: string
}
export type Tab = {
  name: string,
  content: Block | ChildrenType,
  pathRoute: string,
}

//TODO перенести логику роутинга в Routes, который планируется в 3 спринте
export class Tabs extends Block {
  private pathname: string;
  protected currentTab: string;
  protected activeLink: string
  protected currentPathname: Location

  constructor({ globalListerners, rootPathname, ...otherProps }: TabsProps) {
    super('div', {
      globalListerners,
      rootPathname,
      class: `${s.tabs} ${styles.getClassWithPrefix(s, 'tabs', otherProps.stylePrefix || '')}`,
      ...otherProps
    });
    //console.log(this.props.tabsConfig)
    this.pathname = window.location.pathname
    /*this.activeLink = tabsConfig.filter((tab) => this.pathname.includes(tab.pathRoute))[0]?.pathRoute || tabsConfig[0]?.pathRoute;
    this.links = tabsConfig.map((tab) => new Link({
      href: tab.pathRoute, text: tab.name, stylePrefix: 'tabs', active: !!(tab.pathRoute === this.activeLink),
    }))*/

    /*this.setProps({
      class: `${s.tabs} ${styles.getClassWithPrefix(s, 'tabs', this.props.stylePrefix)}`,
      /*    globalListerners:[{
           targetElement:window,
           event: 'popstate',
           action: (e:Event)=>console.log(e),
         }]  
    },

    )*/
  }
  initChildren() {
    console.log(this.children.tabsConfig)
    //if(typeof this.children.tabsConfig==='Array')  this.children.tabsConfig.forEach(item=> {console.log(item)})
    const links = this.children.tabsConfig.map((tab: Tab) => {
      const newLink = new Link({
        href: tab.pathRoute,
        text: tab.name,
        stylePrefix: 'tabs',
        active: !!(tab.pathRoute == this.activeLink),
      })
      return newLink
    })
    console.log(links)

    this.children = {
      ...this.children,
      links
    }
    /*console.log(this.props.tabsConfig[0]!.pathRoute
      )*/
  }


  protected render() {

    return this.compile(tpl, this.props);
  }

  _addGlobalListerners() {
    const { globalListerners = [] } = this.props;

    /*Object.keys(globalListerners).forEach(eventName => {
      this._element.addEventListener(eventName, events[eventName]);
    });*/
  }
}
