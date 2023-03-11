import { getChats } from '../modules/Chats';
import { getAuthForm } from '../modules/Auth';
import { getRegistrationForm } from '../modules/Registration';
import { getServerErrorPage } from '../modules/ServerErrorPage';
import { getNotFoundPage } from '../modules/NotFoundPage';
import { getNavigationPage } from '../modules/Navigation';
import { routes } from '../utiles/constants';
import { getSettingPage } from '../modules/Settings';
import { router } from './Router';

const renderPage = () => {
  window.addEventListener('DOMContentLoaded', async () => {
    router
      .use(routes.home, getNavigationPage())
      .use(routes.chats, getChats())
      .use(routes.authorization, getAuthForm())
      .use(routes.registration, getRegistrationForm())
      .use(routes.serverError, getServerErrorPage())
      .use(routes.notFound, getNotFoundPage())

      .use(routes.setRegInfo, getSettingPage(routes.setRegInfo))
      .use(routes.setAvatar, getSettingPage(routes.setAvatar))
      .use(routes.setSafety, getSettingPage(routes.setSafety))
      .use(routes.setting, getSettingPage(routes.setRegInfo))

      .start();
  });
};

export default renderPage;
