
## Описание
Небольшой онлайн-мессенджер на чистом ***typescript***. 
Для реактивного рендера компонентов используется абстрактный класс  [Block](https://github.com/Vakulina/middle.messenger.praktikum.yandex/blob/29d05459fce863bbcc4bfba7ebe6e40f556f4e1b/src/services/Block.ts). В нем реализован минимальный  жизненный цикл компонента. Применение паттерна ***Event Bus*** позволяет подписаться на нужные события - изменения пропсов и события.

Для запросов к серверу используется класс [HTTPTranspor](https://github.com/Vakulina/middle.messenger.praktikum.yandex/blob/29d05459fce863bbcc4bfba7ebe6e40f556f4e1b/src/services/HTTPTransport.ts) - обертка над XMLHttpRequest, реализующая CRUD методы из REST API (GET, POST, PUT, DELETE).

Навигация по сайту организована с помощью класса [Router](https://github.com/Vakulina/middle.messenger.praktikum.yandex/blob/29d05459fce863bbcc4bfba7ebe6e40f556f4e1b/src/services/Router.ts) c использованием паттерна ***Singltone***. Router реализует методы инициализации, перехода на нужный роут (отображение нужного блока в зависимости от URL), навигации по window.history.

Самостоятельный проект, разработанный в рамках курса Яндекс.Практикум "Мидл фронтенд разработчик". 

- Деплой **[messeger](https://my-messager.onrender.com)**
- [Макет figma](https://www.figma.com/file/bb2uxusIP7DzcWLj5qITnJ/Chat_external_link-(Copy)?node-id=0%3A1&t=BECpoojdFInoPUYE-1)

## Тестовые данные для входа без регистрации
- Логин **Tester**
- Пароль **Test2023**

### Используемые технологии:
- typescript
- ООП
- Websocet API
- XMLHttpRequest API
- webpack
- docker
- Mocha, Chai и Sinon

## Команды

- npm i - инициализация проекта
- npm run start - запуск проекта в режиме разработки на dev-сервере
- npm run build && node server.js - локальный запуск проекта 

### Спринт 1 
- разработан [макет приложения в Figma](https://www.figma.com/file/bb2uxusIP7DzcWLj5qITnJ/Chat_external_link-(Copy)?node-id=0%3A1&t=BECpoojdFInoPUYE-1) (улучшен [стандартный прототип](https://www.figma.com/file/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0%3A1))
- свёрстаны основные страницы приложения с использованием шаблонизатора handlebars
- настроена сборка приложения с помощью Parcel![Messager - Google Chrome 2023-08-08 15-34-36 (1)]
- написан легкий сервер на Express для раздачи статики 
- настроен [автодеплой верстки на Netlify](https://63c0419acf5bc33db6300d3c--glowing-crisp-5ef741.netlify.app/) из ветки deploy

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
- Деплой на Render.com https://my-messager.onrender.com/sign-in

![Messager - Google Chrome 2023-08-08 15-34-36 (1)](https://github.com/Vakulina/middle.messenger.praktikum.yandex/assets/80524794/45f55a54-480d-4172-ab1b-d9e9d0dbba1c)
