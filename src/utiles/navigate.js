import { getChats } from '~src/modules/chats';
import chatHistory from '../modules/chats/Chats';
import { getAuthForm } from '../modules/auth';
import { getRegistrationForm } from '../modules/registration';
import { getServerErrorPage } from '../modules/serverErrorPage';
import { getNotFoundPage } from '../modules/notFoundPage';
import { getNavigationPage } from '~src/modules/navigation';
import { routes } from './constants';
import { getSettingPage } from '../modules/settings';
import { render } from '../services/renderBlock';

const renderPage = () => {
  const { pathname } = window.location;

  switch (pathname) {
    case routes.home:
      render(getNavigationPage().getContent());
      break;
    case routes.chats:
      render(getChats().getContent());
      break;
    case routes.chat:
      render(chatHistory().getContent());
      break;
    case routes.authorization:
      render(getAuthForm().getContent());
      break;
    case routes.registration:
      render(getRegistrationForm().getContent());
      break;
    case routes.serverError:
      render(getServerErrorPage().getContent());
      break;
    case routes.notFound:
      render(getNotFoundPage().getContent());
      break;
    case routes.setting:
      render(getSettingPage().getContent());
      break;
    case routes.setAvatar:
      render(getSettingPage().getContent());
      break;
    case routes.setRegInfo:
      render(getSettingPage().getContent());
      break;
    case routes.setSafety:
      render(getSettingPage().getContent());
      break;
    default:
      render(getNotFoundPage().getContent());
      break;
  }
};

export default renderPage;
