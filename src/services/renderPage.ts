import { getChats } from '~src/modules/chats';
import { getAuthForm } from '../modules/auth';
import { getRegistrationForm } from '../modules/registration';
import { getServerErrorPage } from '../modules/serverErrorPage';
import { getNotFoundPage } from '../modules/notFoundPage';
import { getNavigationPage } from '~src/modules/navigation';
import { routes } from '../utiles/constants';
import { getSettingPage } from '../modules/settings';
import router from './Router';

const renderPage = () => {

  window.addEventListener('DOMContentLoaded', async () => {
    router
      .use(routes.home, getNavigationPage())
      .use(routes.chats, getChats())
      .use(routes.authorization, getAuthForm())
      .use(routes.registration, getRegistrationForm())
      .use(routes.serverError, getServerErrorPage())
      .use(routes.notFound, getNotFoundPage())
      .use(routes.setting, getSettingPage())
      .start()
  }  )
 
};

export default renderPage;
