import { avatarTemplate } from './avatarSetting';
import { passwordTemplate } from './PasswordSetting';
import { registrationInfoTemplate } from './RegistrationInfoSetting';
import Block, { PropsType } from '../../services/Block';
import tpl from './tpl.hbs';
import { PageLayout } from '../../components/PageLayout';
import style from './style.module.scss';
import { Tabs } from '../../components/Tabs';
import connectWithStore from '../../services/connectWithStore';
import AuthActions from '../../actions/AuthActions';
import { Link } from '../../components/Link';
import { routes } from '../../utiles/constants';
import { Button } from '../../components/Button';

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
  constructor(tag = 'section', { tabs, otherProps }: any) {
    super(
      tag,
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

  protected initChildren(): void {
    this.children = {
      toChats: new Link({ href: routes.chats, text: '<-', stylePrefix: 'settings' }),
      exit: new Button({
        text: 'Выйти из системы',
        stylePrefix: 'logout',
        type: 'button',
        events: {
          click: () => {
            this.logout();
          },
        },
      }),
      ...this.children,
    };
  }

  async logout() {
    await AuthActions.logout();
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
    content: getSettingLayout(activeLink || tabsConfig[0]!.pathRoute),
  });
};
