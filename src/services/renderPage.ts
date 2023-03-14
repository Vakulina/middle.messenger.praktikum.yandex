import { getChats } from '../modules/Chats';
import { getAuthForm } from '../modules/Auth';
import { getRegistrationForm } from '../modules/Registration';
import  getServerErrorPage  from '../modules/ServerErrorPage/ServerErrorPage';
import  getNotFoundPage  from '../modules/NotFoundPage/NotFoundPage';
import { routes } from '../utiles/constants';
import { getSettingPage } from '../modules/settings';
import { router } from './Router';
import AuthActions from '../actions/AuthActions';

const renderPage = async () => {
  window.addEventListener('DOMContentLoaded', async () => {
    router
      .use(routes.home, getChats())
      .use(routes.chats, getChats())

      .use(routes.authorization, getAuthForm())
      .use(routes.registration, getRegistrationForm())

      .use(routes.serverError, getServerErrorPage())
      .use(routes.notFound, getNotFoundPage())
      .use(routes.setRegInfo, getSettingPage(routes.setRegInfo))
      .use(routes.setAvatar, getSettingPage(routes.setAvatar))
      .use(routes.setSafety, getSettingPage(routes.setSafety))
      .use(routes.setting, getSettingPage(routes.setRegInfo));

    const unprotectedRoutes = [
      routes.authorization,
      routes.registration,

    ];
    const currentUrl = window.location.pathname;

    if (Object.values(routes).includes(currentUrl)) {
      const res = await AuthActions.getUser();
      if ('id' in res) {
        router.start();
        if (unprotectedRoutes.includes(currentUrl)) {
          router.go(routes.chats);
        }
      } else {
        router.start();
        router.go(routes.authorization);
      }
    } else {
      router.start();
      router.go(routes.notFound);
    }
  });
};

export default renderPage;
