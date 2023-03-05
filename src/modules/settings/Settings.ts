import { avatarTemplate } from './avatarSetting';
import { passwordTemplate } from './passwordSetting';
import { registrationInfoTemplate } from './registrationInfoSetting';
import Block, { PropsType } from '~src/services/Block';
import tpl from './tpl.hbs';
import { PageLayout } from '~src/components/pageLayout';
import * as style from './style.module.scss';
import { Tabs } from '~src/components/tabs';
import connectWithStore from '~src/services/connectWithStore';
import AuthActions from '~src/actions/AuthActions';

export type Tab = {
  name: string,
  content: Block,
  pathRoute: string,
};
export type SettingsType = {
  tabs: Tab[]
} | PropsType;

export const tabsConfig: Tab[] = [
  {
    name: 'Личные данные',
    content: registrationInfoTemplate,
    pathRoute: '/settings/reg-info',
  },
  {
    name: 'Аватар',
    content: avatarTemplate,
    pathRoute: '/settings/avatar',
  },
  {
    name: 'Безопасность',
    content: passwordTemplate,
    pathRoute: '/settings/safety',
  },
];

class SettingsBase extends Block {
  constructor(tag: string, { tabs, otherProps }: any) {
    super(
      tag = 'section',
      {
        tabs, class: style.setting, id: 'settings', ...otherProps,
      },
    );
    this.setProps({
      user: () => this.state.isLogin,
      avatar: () => this.state.avatar,
    });
    AuthActions.getUser();
  }

  protected render() {
    return this.compile(tpl, this.props);
  }
}

const getSettingTabs = (activeLink: string) => new Tabs({ activeLink, tabsConfig, rootPath: '/settings' });

const getSettingLayout = (activeLink: string) => connectWithStore(
  'section',
  SettingsBase,
  (state) => {
    const { user, isLogin } = state;
    return { user, isLogin };
  },
  { tabs: getSettingTabs(activeLink), title: 'Настройки профиля' },
);

export const getSettingPage = (activeLink?: string) => {
  return new PageLayout({
    content: getSettingLayout(activeLink || tabsConfig[0].pathRoute),
  });
};
