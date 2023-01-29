import tpl from './tpl.hbs';
import {PageLayout} from '../../components/pageLayout';
import tabs from '../../components/tabs';
import style from './style.module.scss';
import {  avatarTemplate,} from './avatarTemplate';
import { registrationInfoTemplate } from './registrationInfoTemplate';
import {passwordTemplate} from './passwordTemplate'

const tabsConfig = [
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

const tabsContent = tabs(tabsConfig);
const content = tpl({ tabsContent, class: style.setting });

const setting = () =>new PageLayout({content:avatarTemplate});

export default setting;
