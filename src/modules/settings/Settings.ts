import { avatarTemplate } from './avatarTemplate';
import { passwordTemplate } from './passwordTemplate';
import { registrationInfoTemplate } from './registrationInfoTemplate';
import Block, { PropsType } from '~src/services/Block';
import tpl from './tpl.hbs';
import { PageLayout } from '~src/components/pageLayout';
import style from './style.module.scss'
import { Tabs } from '~src/components/tabs';

export type Tab = {
  name: string,
  content: Block,
  pathRoute: string,
}
export type SettingsType = {
  tabs: Tab[]
} | PropsType

export const tabsConfig: Tab[] = [
  {
    name: 'Личные данные',
    content: registrationInfoTemplate,
    pathRoute: '/setting/reg-info',
  },
  {
    name: 'Аватар',
    content: avatarTemplate,
    pathRoute: '/setting/avatar',
  },
  {
    name: 'Безопасность',
    content: passwordTemplate,
    pathRoute: '/setting/safety',
  },
];

class Settings extends Block {
  constructor({ tabs, ...otherProps }: SettingsType) {
    super('section',
      { tabs, class: style.setting, ...otherProps })
  }
  protected render() {
    return this.compile(tpl, this.props);
  }
};
const settingTabs = new Tabs({ tabsConfig, rootPathname: '/setting',  })
//console.log(settingTabs)

const settingLayout = new Settings({ tabs: settingTabs, title:'Настройки профиля' })
console.log(settingLayout)

export const getSettingPage = () => new PageLayout({ content: settingLayout})
