import chatSelection from '../modules/chatSelection';
import chatHistory from '../modules/chatHistory';
import auth from '../modules/auth';
import registration from '../modules/registration';
import notFoundPage from '../modules/notFoundPage';
import serverErrorPage from '../modules/serverErrorPage';
import { routes } from './constants';
import settings from '../modules/settings';

const menuTemplate = `<nav>
    <ul>
    <li>
        <a href=./chats>Список чатов</a>
    </li>
    <li>
        <a href=./chat>Лента переписки</a>
    </li>
    <li>
        <a href=./setting>Настройки профиля</a>
    </li>
    <li>
        <a href=./sign-in>Авторизация</a>
    </li>
    <li>
        <a href=./sign-up>Регистрация</a>
    </li>
    <li>
        <a href=./not-found >404</a>
    </li>
    <li>
        <a href=./error>Ошибка сервера</a>
    </li>
    </ul>
</nav>`;

const renderPage = () => {
  const { pathname } = window.location;
  function render(pageTemplate) {
    document.getElementById('root').innerHTML = pageTemplate;
  }
  switch (pathname) {
    case routes.home:
      render(menuTemplate);
      break;
    case routes.chats:
      render(chatSelection());
      break;
    case routes.chat:
      render(chatHistory());
      break;
    case routes.authorization:
      render(auth());
      break;
    case routes.registration:
      render(registration());
      break;
    case routes.serverError:
      render(serverErrorPage());
      break;
    case routes.notFound:
      render(notFoundPage());
      break;
    case routes.setting:
      render(settings());
      break;
    case routes.setAvatar:
      render(settings());
      break;
    case routes.setRegInfo:
      render(settings());
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
