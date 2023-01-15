import tpl from './tpl.hbs';
import pageLayout from '../../components/pageLayout';
import tabs from '../../components/tabs';
import style from './style.module.scss';
import { registrationInfoTemplate, avatarTemplate, passwordTemplate } from './utiles';

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
  

const tabsContent = tabs(tabsConfig )
const content = tpl({ tabsContent, class: style.setting });

const setting = () => {
	return pageLayout(content);
};

export default setting;
