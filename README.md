
## Описание

Самостоятельный проект, разработанный в рамках курса Яндекс.Практикум. 

- Деплой [messeger](https://messeger3.onrender.com/)
- [Макет figma](https://www.figma.com/file/bb2uxusIP7DzcWLj5qITnJ/Chat_external_link-(Copy)?node-id=0%3A1&t=BECpoojdFInoPUYE-1)

## Команды

- npm i - инициализация проекта
- npm run start - запуск проекта в режиме разработки на dev-сервере
- npm run build && node server.js - локальный запуск проекта 

### Спринт 1 
- разработан [макет приложения в Figma](https://www.figma.com/file/bb2uxusIP7DzcWLj5qITnJ/Chat_external_link-(Copy)?node-id=0%3A1&t=BECpoojdFInoPUYE-1) (улучшен [стандартный прототип](https://www.figma.com/file/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0%3A1))
- свёрстаны основные страницы приложения с использованием шаблонизатора handlebars
- настроена сборка приложения с помощью Parcel
- написан легкий сервер на Express для раздачи статики 
- настроен [автодеплой на Netlify](https://63c0419acf5bc33db6300d3c--glowing-crisp-5ef741.netlify.app/) из ветки deploy

### Спринт 2 
- перенос на typescript
- разбитие на отдельные компоненты
- организация жизненного цикла компонентов с помощью абстрактного класса Block
- подписка на события с помощью Event Bus
- внедрение stylelint и eslint
- валидация форм
- подготовлен класс HTTPTransport для работы с запросами к API

### Спринт 3
- работа с [API](https://ya-praktikum.tech/api/v2/swagger/#/) 
- авторизация
- настройки профиля (изменение данные пользователя, аватара, пароля)
- работа с чатами (список чатов пользователя, создать новый чат, добавить пользователя в чат, удалить пользователя из чата)
- создания слоя с websocket-соединением для для работы с real-time сообщениями

### Спринт 4
- Напиcаны тесты для классов Router, Block, HTTPTransport с использованием  Mocha, Chai и Sinon
- Настроен Webpack (для TypeScript, SASS и Handlebars)
- Настроен precommit на проект
- Проведен аудит пакетов
- Настроена Docker-сборка статического приложения и запуска сервера на Node.js
- Деплой на [Render.com](https://messeger3.onrender.com/)
