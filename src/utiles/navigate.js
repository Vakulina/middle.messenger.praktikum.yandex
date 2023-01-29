import chatSelection from '../modules/chatSelection';
import chatHistory from '../modules/chatHistory';
import { getAuthForm } from '../modules/auth';
import { getRegistrationForm } from '../modules/registration';
import { getServerErrorPage } from '../modules/serverErrorPage';
import { getNotFoundPage } from '../modules/notFoundPage';
import {getNavigationPage} from '~src/modules/navigation'
import { routes } from './constants';
import settings from '../modules/settings';
import {render} from '../services/renderBlock'

const renderPage = () => {
  const { pathname } = window.location;

  switch (pathname) {
    case routes.home:
      render(getNavigationPage().getContent());
      break;
    case routes.chats:
      render(chatSelection());
      break;
    case routes.chat:
      render(chatHistory());
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
      render(settings().getContent());
      break;
    case routes.setAvatar:
      render(settings().getContent());
      break;
    case routes.setRegInfo:
      render(settings().getContent());
      break;
    case routes.setSafety:
      render(settings());
      break;
    default:
      render(notFoundPage());
      break;
  }
};

export default renderPage;
