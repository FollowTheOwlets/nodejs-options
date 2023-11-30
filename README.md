# Разработка клиент серверных приложений на Node.js
## План инструкции
- [Введение](#1-введение)
- [Установка Node.js и npm](#2-установка-nodejs-и-npm)
- [Создание проекта](#3-создание-проекта)
- [Установка Express](#4-установка-express)
- [Работа сMiddleware](#5-работа-с-middleware)
- [Работа с маршрутами (Routes)](#6-работа-с-маршрутами-routes)
- [Работа с шаблонизаторами](#7-работа-с-шаблонизаторами-template-engines)
- [Работа со Статическими Файлами](#8-работа-со-статическими-файлами)
- [Работа с Параметрами Запроса](#9-работа-с-параметрами-запроса)
- [Работа с Cookies и Session](#10-работа-с-cookies-и-session)
- [Аутентификация и Авторизация](#11-аутентификация-и-авторизация)
- [Работа с WebSocket](#12-работа-с-websocket)
- [Тестирование](#13-тестирование-express-приложений)
- [Fetch и клиент-серверное взаимодействие](#14-fetch-на-клиенте-и-настройка-cors)


## 1. Введение

Node.js и Express - это платформы, позволяющие создавать высокопроизводительные веб-приложения с использованием языка JavaScript. Вот почему они становятся все более популярными в сообществе веб-разработчиков.

### 1.1 Что такое Node.js?

Node.js - это среда выполнения JavaScript, построенная на движке V8 от Google Chrome. Однако, в отличие от браузера, Node.js позволяет выполнять JavaScript на сервере. Это открывает возможность использовать один и тот же язык программирования и на клиенте, и на сервере.

Основные особенности Node.js включают:
- **Асинхронность**: Node.js работает асинхронно, что позволяет эффективно обрабатывать большое количество одновременных запросов.
- **Модульность**: Встроенная система модулей облегчает организацию кода и его повторное использование.
- **Эффективность**: Высокая производительность благодаря использованию событийного цикла.

### 1.2 Что такое Express?

Express - это минималистичный и гибкий веб-фреймворк для Node.js. Он предоставляет набор удобных инструментов для разработки веб-приложений и API.

Основные возможности Express включают:
- **Маршрутизация**: Легкое определение маршрутов для обработки HTTP-запросов.
- **Middleware**: Встроенная система Middleware для обработки запросов и ответов.
- **Шаблонизация**: Возможность использовать различные шаблонизаторы для удобства создания представлений.
- **Модульность**: Поддержка модульной структуры приложения.

### 1.3 Почему использовать Node.js и Express?

- **Единый язык программирования**: Возможность использовать JavaScript как на клиентской, так и на серверной стороне.
- **Высокая производительность**: Асинхронная модель выполнения и эффективное использование ресурсов.
- **Большое сообщество**: Обширное сообщество разработчиков, готовых поддерживать и советовать.
- **Модульность и гибкость**: Возможность выбора нужных инструментов и подходов.

Node.js и Express вместе предоставляют мощный инструментарий для создания современных веб-приложений, и эта инструкция поможет вам освоить основы и начать использовать их в своих проектах.

## 2. Установка Node.js и npm

### 2.1 Установка Node.js

Для начала установим Node.js, используя официальный [сайт Node.js](https://nodejs.org/).

#### На Windows:

1. Скачайте установщик Node.js.
2. Запустите установщик и следуйте инструкциям мастера установки.
3. После завершения установки, откройте командную строку и выполните:

   ```bash
   node -v
   ```

   Это подтвердит успешную установку Node.js.

   ```bash
   npm -v
   ```

   Это проверит версию npm (Node Package Manager).

#### На macOS:

1. Установите [Homebrew](https://brew.sh/), если еще не установлено.
2. В терминале выполните:

   ```bash
   brew install node
   ```

3. Проверьте версии Node.js и npm:

   ```bash
   node -v
   ```

   ```bash
   npm -v
   ```

#### На Linux (Ubuntu):

1. Откройте терминал и выполните:

   ```bash
   sudo apt update
   sudo apt install nodejs npm
   ```

2. Проверьте версии Node.js и npm:

   ```bash
   node -v
   ```

   ```bash
   npm -v
   ```

### 2.2 Проверка успешной установки

После установки Node.js и npm, убедитесь, что они работают корректно:

1. Создайте новый файл `index.js`.
2. Внутри файла `index.js` напишите код:

   ```javascript
   console.log("Hello, Node.js!");
   ```

3. Сохраните файл и выполните в терминале:

   ```bash
   node index.js
   ```

   Если видите вывод "Hello, Node.js!", то установка прошла успешно.

Теперь среда готова к разработке приложений на Node.js.

### 2.3 Основные Команды NPM и Настройка `package.json`

NPM (Node Package Manager) - это инструмент для управления пакетами и зависимостями в проектах Node.js. Вот несколько основных команд NPM и их использование:

```bash
npm init
```

Команда позволяет вам создать `package.json` файл, задавая различные параметры вашего проекта, такие как имя, версия, описание и другие.

```bash
npm install <package-name> --save
```

Команда устанавливает зависимость в вашем проекте. Флаг `--save` добавляет зависимость в секцию `dependencies` вашего `package.json`.

```bash
npm install <package-name> --save-dev
```

Аналогично предыдущей команде, но зависимость добавляется в секцию `devDependencies` вашего `package.json`.

```bash
npm install -g <package-name>
```

Команда устанавливает пакет глобально, что означает, что он будет доступен в системе вне зависимости от текущего каталога.

В разделе `"scripts"` вашего `package.json` вы можете определить собственные команды, которые легко вызвать с помощью NPM. Пример:

```json
"scripts": {
  "start": "node server.js",
  "test": "mocha",
  "build": "webpack",
  "deploy": "npm run build && scp -r ./dist user@server:/path/to/deploy"
}
```
Кроме `npm start`, команды буду выполнятся в формате:
```bash
npm run <command-name>
```

- **start**: Запуск приложения.
- **test**: Запуск тестов.
- **build**: Сборка проекта.
- **deploy**: Вызывает сначала сборку (`npm run build`), а затем копирует результаты на сервер.

Дополнительные команды:

- **npm outdated**: Показывает устаревшие версии пакетов.
- **npm update**: Обновляет все пакеты до последних версий.
- **npm uninstall <package-name>**: Удаляет пакет из зависимостей проекта.
- **npm ls**: Показывает дерево зависимостей..

### Пример `.npmrc`:

Файл `.npmrc` может использоваться для настройки различных параметров NPM, таких как репозиторий по умолчанию:

```plaintext
registry=https://registry.npmjs.org/
```

Это указывает использовать официальный реестр пакетов NPM.

### Пример `package.json`:

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "description": "My Awesome App",
  "main": "index.js",
  "scripts": {
    "start": "node server.js",
    "test": "mocha",
    "build": "webpack",
    "deploy": "npm run build && scp -r ./dist user@server:/path/to/deploy"
  },
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "mocha": "^9.0.3",
    "webpack": "^5.68.0"
  }
}
```
Это пример простого `package.json`. Настройте его в соответствии с конкретными потребностями вашего проекта.

## 3. Создание проекта

### 3.1 Инициализация проекта с использованием npm

Для создания нового проекта с использованием npm выполните следующие шаги:

1. Откройте терминал и перейдите в папку, где вы хотите создать проект.

2. Используйте следующую команду для инициализации нового проекта:

   ```bash
   npm init -y
   ```

   Эта команда создаст файл `package.json` со значениями по умолчанию. Флаг `-y` позволяет принять все значения по умолчанию.

### 3.2 Создание основных файлов и структуры проекта

Создайте основные файлы и папки для вашего проекта:

1. **index.js**: Главный файл вашего приложения, в котором будет точка входа.

   ```javascript
   const express = require('express');
   const app = express();
   const PORT = process.env.PORT || 3000;

   // Подключение маршрутов
   const mainRoutes = require('./routes/main');
   app.use('/', mainRoutes);

   app.listen(PORT, () => {
     console.log(`Сервер запущен на порту ${PORT}`);
   });
   ```

2. **routes/main.js**: Файл с маршрутами для главной страницы.

   ```javascript
   const express = require('express');
   const router = express.Router();

   router.get('/', (req, res) => {
     res.send('Это главная страница');
   });

   module.exports = router;
   ```

3. **public/**: Создайте папку для статических файлов (CSS, изображения и т.д.).
4. **views/**: Создайте папку для шаблонов (если вы планируете использовать шаблонизатор).
5. **routes/**: Папка для хранения маршрутов вашего приложения.

   ```javascript
   // Пример routes/admin.js
   const express = require('express');
   const router = express.Router();

   router.get('/admin', (req, res) => {
     res.send('Административная панель');
   });

   module.exports = router;
   ```

6. **.gitignore**: Если вы используете систему контроля версий Git, создайте файл `.gitignore` и добавьте в него папли и файлы, которые необходимо игнорировать при коммите.

   ```
   node_modules/
   .env
   ```

Теперь ваш проект имеет базовую структуру, и вы готовы приступить к разработке с использованием Node.js и Express.

## 4. Установка Express

### 4.1 Установка Express через npm

Для использования Express в вашем проекте выполните следующие шаги:

1. Откройте терминал в корневой папке вашего проекта.

2. Установите Express с помощью npm:

   ```bash
   npm install express
   ```

   Эта команда установит Express и добавит его в раздел `dependencies` вашего файла `package.json`.

### 4.2 Подключение Express к проекту

После установки Express подключите его в главном файле вашего приложения (`index.js`):

```javascript
const express = require('express');
const mainRoutes = require('./routes/main');
const adminRoutes = require('./routes/admin');
const app = express();
const PORT = process.env.PORT || 3000;

// Подключение маршрутов
app.use('/', mainRoutes);
app.use('/admin', adminRoutes);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
```

### 4.3 Работа с маршрутами (Routes)

Express позволяет определять маршруты для обработки HTTP-запросов. В приведенном выше примере, `mainRoutes` обрабатывает запросы к корневому URL, а `adminRoutes` обрабатывает запросы к `/admin`.

Пример файла маршрутов (`routes/main.js`):

```javascript
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Это главная страница');
});

module.exports = router;
```

Пример файла маршрутов (`routes/admin.js`):

```javascript
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Административная панель');
});

module.exports = router;
```

Теперь при обращении к корневому URL (`/`) вашего приложения, будет вызываться соответствующий обработчик маршрута, отправляя ответ "Это главная страница". Аналогично, обращение к `/admin` вызовет обработчик маршрута для административной панели.

Express предоставляет множество методов для обработки различных типов запросов и параметров маршрутов. Можно также использовать middleware для выполнения операций до или после обработки запроса.

## 5. Работа с Middleware

### 5.1 Что такое Middleware и зачем оно нужно

Middleware - это функции, которые выполняются между получением запроса и отправкой ответа. Они предоставляют централизованный способ добавления функциональности в приложение Express. Middleware может выполнять различные задачи, такие как обработка запросов, изменение объекта запроса или ответа, вызов следующего middleware в цепочке и многое другое.

### 5.2 Создание и применение Middleware в Express

В Express middleware представляет собой функцию, которая принимает три аргумента: объект запроса (`req`), объект ответа (`res`) и функцию `next`. `next` используется для передачи управления следующему middleware в цепочке.

Пример простого middleware:

```javascript
// Пример middleware
const myMiddleware = (req, res, next) => {
  console.log('Middleware выполнено');
  next(); // Вызываем следующее middleware
};

// Подключаем middleware ко всем маршрутам
app.use(myMiddleware);
```

В приведенном выше примере, `myMiddleware` будет выполнено для каждого запроса перед тем, как дойти до маршрутов.

Можно также использовать middleware только для определенных маршрутов:

```javascript
// Пример middleware для конкретного маршрута
const specificMiddleware = (req, res, next) => {
  console.log('Middleware для конкретного маршрута');
  next();
};

// Подключаем middleware только к определенному маршруту
app.use('/admin', specificMiddleware);
```

Теперь `specificMiddleware` будет выполнено только при запросах к маршруту `/admin`.

### 5.3 Обработка Ошибок в Middleware

Middleware также может использоваться для обработки ошибок. Рассмотрим пример middleware для обработки 404 ошибки (страница не найдена):

```javascript
// Обработка 404 ошибки middleware
const notFoundHandler = (req, res, next) => {
  res.status(404).send('Страница не найдена');
};

// Подключение middleware только к конкретному маршруту
app.use('/not-found', notFoundHandler);
```

В этом примере, если к приложению обращаются по маршруту `/not-found`, middleware `notFoundHandler` отправит клиенту ответ с кодом состояния 404 и сообщением "Страница не найдена".

Middleware - это мощный инструмент для обработки различных аспектов запросов в Express, включая логирование, обработку ошибок, аутентификацию и многое другое.

### 5.4 Функция `next` и Обработка Ошибок

`next` - это функция, которая передает управление следующему middleware в цепочке. Если `next` вызывается без аргументов, выполнение передается следующему middleware. Если передается аргумент, Express воспринимает это как ошибку, и управление передается специализированному обработчику ошибок.

Пример middleware с ошибкой:

```javascript
// Middleware с ошибкой
const errorMiddleware = (req, res, next) => {
  const err = new Error('Это ошибка!');
  next(err); // Передаем ошибку следующему middleware
};

// Обработка ошибки
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Что-то пошло не так!');
});
```

В этом примере, если `errorMiddleware` вызывает `next` с аргументом, Express считает это ошибкой и передает управление специализированному middleware для обработки ошибок. Это позволяет централизованно управлять ошибками в вашем приложении.

## 6. Работа с маршрутами (Routes)

### 6.1 Определение базовых маршрутов для приложения

Маршруты в Express определяются с использованием методов HTTP (`GET`, `POST`, `PUT`, `DELETE`) и соответствующих функций-обработчиков. Вот пример определения базовых маршрутов:

```javascript
// Обработка GET запроса к корневому URL
app.get('/', (req, res) => {
  res.send('Привет, мир!');
});

// Обработка POST запроса
app.post('/submit', (req, res) => {
  res.send('Данные успешно отправлены!');
});

// Обработка PUT запроса
app.put('/update', (req, res) => {
  res.send('Данные успешно обновлены!');
});

// Обработка DELETE запроса
app.delete('/delete', (req, res) => {
  res.send('Данные успешно удалены!');
});
```

### 6.2 Передача параметров в маршрутах

Express позволяет передавать параметры в маршрутах, что делает их более динамичными. Пример:

```javascript
// Маршрут с параметром
app.get('/user/:id', (req, res) => {
  res.send(`Пользователь с ID ${req.params.id}`);
});
```

В этом примере, при обращении к `/user/123`, `req.params.id` будет равно `123`.

### 6.3 Маршруты в отдельных файлах

Для удобства поддержки, маршруты можно вынести в отдельные файлы. Например:

```javascript
// routes/main.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Главная страница');
});

module.exports = router;
```

Затем подключите их в основном файле:

```javascript
// index.js
const express = require('express');
const app = express();

const mainRoutes = require('./routes/main');
app.use('/', mainRoutes);

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
```

Такой подход облегчает поддержку приложения, особенно при наличии множества маршрутов.

Express предоставляет множество возможностей для работы с маршрутами, включая middleware, обработку ошибок, и обработку параметров запроса. Это делает его мощным инструментом для разработки веб-приложений.

#### 6.4 Обработка POST Запросов

Express также обрабатывает POST-запросы, которые используются для отправки данных на сервер. Рассмотрим пример создания маршрута для обработки POST-запроса:

```javascript
// Middleware для обработки данных из тела запроса
app.use(express.json());

// Маршрут для обработки POST-запроса
app.post('/submit', (req, res) => {
  const data = req.body; // Данные из тела запроса
  // Обработка данных...
  res.send('Данные успешно отправлены!');
});
```

В данном примере, мы используем middleware `express.json()`, чтобы парсить данные из тела запроса. Затем в обработчике маршрута мы можем обращаться к этим данным через `req.body`.

#### 6.5 Редиректы

Express позволяет легко выполнять редиректы с помощью метода `res.redirect`. Рассмотрим пример редиректа:

```javascript
// Редирект с одного маршрута на другой
app.get('/old-route', (req, res) => {
  res.redirect('/new-route');
});
```

В данном примере, при обращении к `/old-route`, клиент будет автоматически перенаправлен на `/new-route`.

#### 6.6 Отправка Статуса и JSON

Express позволяет явно указывать статус ответа с помощью `res.status()` и отправлять JSON с помощью `res.json()`.

Пример отправки успешного статуса и JSON:

```javascript
app.get('/success-json', (req, res) => {
  const responseData = { message: 'Успешный запрос' };
  res.status(200).json(responseData);
});
```

Пример отправки ошибочного статуса и JSON:

```javascript
app.get('/error-json', (req, res) => {
  const errorData = { error: 'Произошла ошибка' };
  res.status(500).json(errorData);
});
```

В данном примере, `res.status(200)` указывает успешный HTTP-статус 200, а `res.status(500)` указывает ошибочный HTTP-статус 500. Мы также используем `res.json()` для отправки данных в формате JSON.

#### 6.7 Изменение Статуса в Зависимости от Условия

Express позволяет изменять статус ответа в зависимости от условий в обработчике маршрута. Например:

```javascript
app.get('/dynamic-status', (req, res) => {
  const condition = true; // Ваше условие
  if (condition) {
    res.status(200).send('Успешный запрос');
  } else {
    res.status(404).send('Ресурс не найден');
  }
});
```

## 7. Работа с Шаблонизаторами (Template Engines)

### 7.1 Выбор и Установка Шаблонизаторов

Express поддерживает различные шаблонизаторы. Дополним примеры с использованием **EJS** и добавим поддержку **Pug** (ранее известного как Jade).

#### 7.1.1 Установка EJS:

```bash
npm install ejs
```

#### 7.1.2 Установка Pug:

```bash
npm install pug
```

### 7.2 Подключение Шаблонизаторов к Express

В главном файле приложения (`index.js`), добавим поддержку EJS и Pug:

```javascript
const express = require('express');
const app = express();
const ejs = require('ejs');
const pug = require('pug');

// Установка EJS в качестве шаблонизатора
app.set('view engine', 'ejs');

// Установка Pug в качестве шаблонизатора
// app.set('view engine', 'pug');
```

### 7.3 Создание и Рендеринг Шаблонов с EJS

Создадим файл `views/index.ejs`:

```html
<!-- views/index.ejs -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EJS Example</title>
</head>
<body>
  <h1><%= title %></h1>
  <ul>
    <% for (let item of items) { %>
      <li><%= item %></li>
    <% } %>
  </ul>
</body>
</html>
```

В маршруте (`index.js`), передадим данные для рендеринга:

```javascript
// index.js
app.get('/ejs', (req, res) => {
  const data = { title: 'Express с EJS', items: ['Пункт 1', 'Пункт 2', 'Пункт 3'] };
  res.render('index', data);
});
```

#### 7.4 Создание и Рендеринг Шаблонов с Pug

Создадим файл `views/index.pug`:

```pug
// views/index.pug
doctype html
html(lang="en")
  head
    meta(charset="UTF-8")
    meta(name="viewport", content="width=device-width, initial-scale=1.0")
    title Pug Example
  body
    h1= title
    ul
      each item in items
        li= item
```

В маршруте (`index.js`), передадим данные для рендеринга:

```javascript
// index.js
app.get('/pug', (req, res) => {
  const data = { title: 'Express с Pug', items: ['Пункт 1', 'Пункт 2', 'Пункт 3'] };
  res.render('index', data);
});
```

Теперь вы можете обращаться к `/ejs` или `/pug` в вашем приложении, чтобы увидеть как EJS и Pug работают с объектами и массивами данных в шаблонах.

## 8. Работа со Статическими Файлами

### 8.1 Создание Папки для Статических Файлов

Express позволяет удобно обслуживать статические файлы, такие как изображения, CSS и JavaScript. Создадим папку `public` для хранения таких файлов (операцию можно выполнить и вручную):

```bash
mkdir public
```

### 8.2 Подключение Статических Файлов к Express

В главном файле приложения (`index.js`), добавим middleware `express.static` для обслуживания статических файлов из папки `public`:

```javascript
const express = require('express');
const app = express();

// Подключение статических файлов
app.use(express.static('public'));
```

Теперь все файлы в папке `public` могут быть обслужены напрямую из корня приложения. Например, файл `public/styles.css` будет доступен по адресу `http://localhost:3000/styles.css`, а файл `public/img/cat.png` будет доступен по адресу `http://localhost:3000/img/cat.png`.

### 8.3 Использование Статических Файлов в Шаблонах

В вашем HTML или шаблоне, вы можете ссылаться на статические файлы с использованием метода `express.static`. Пример с EJS:

```html
<!-- views/index.ejs -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css">
  <title>EJS Example</title>
</head>
<body>
  
</body>
</html>
```

Теперь статические файлы могут быть интегрированы в ваши шаблоны и использованы для стилизации или добавления интерактивных элементов на стороне клиента.

## 9. Работа с Параметрами Запроса

### 9.1 Получение Параметров Запроса

Express позволяет получать параметры запроса из URL и запросов POST. Рассмотрим пример получения параметров из URL:

```javascript
app.get('/user', (req, res) => {
  const username = req.query.username;
  const userId = req.query.userId;
  res.send(`Пользователь: ${username}, ID: ${userId}`);
});
```

В данном примере, если к приложению обратиться по `/user?username=John&userId=123`, то `req.query.username` будет равно `'John'`, а `req.query.userId` будет равно `'123'`.

### 9.2 Опциональные Параметры Запроса

Express позволяет определять опциональные параметры запроса. Рассмотрим пример:

```javascript
app.get('/book', (req, res) => {
  const title = req.query.title || 'Не указано';
  const author = req.query.author || 'Не указан';
  res.send(`Книга: ${title}, Автор: ${author}`);
});
```

В данном примере, если к приложению обратиться по `/book?title=Игра%20Престолов`, то `req.query.title` будет равно `'Игра Престолов'`, а если обратиться по `/book`, то `req.query.title` будет равно `'Не указано'`.

### 9.3 Обработка POST Запросов с Параметрами

Для обработки POST-запросов с параметрами, используем middleware `express.urlencoded()`:

```javascript
app.use(express.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  res.send(`Данные получены: ${username}, ${email}`);
});
```

В данном примере, мы используем middleware `express.urlencoded()` для парсинга данных из тела POST-запроса.

Express предоставляет удобные методы для работы с параметрами запроса, как из URL, так и из POST-запросов.

## 10. Работа с Cookies и Session

### 10.1 Установка и Чтение Cookies

Express предоставляет удобный способ работы с cookies. Для установки cookie используется метод `res.cookie`:

```javascript
app.get('/set-cookie', (req, res) => {
  res.cookie('username', 'John Doe');
  res.send('Cookie установлено!');
});
```

В этом примере, при посещении маршрута `/set-cookie`, устанавливается cookie с именем `username` и значением `John Doe`.

Для чтения cookie используется свойство `req.cookies`:

```javascript
app.get('/read-cookie', (req, res) => {
  const username = req.cookies.username;
  res.send(`Привет, ${username}!`);
});
```

### 10.2 Использование Session

Express также позволяет использовать сессии для хранения данных между запросами. Для этого, обычно, используется middleware `express-session`. Начнем с его установки:

```bash
npm install express-session
```

Затем подключим и настроим его в нашем приложении:

```javascript
const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
  secret: 'my-secret-key', // Секретный ключ для подписи куки
  resave: false,
  saveUninitialized: true
}));
```

Теперь мы можем устанавливать и читать данные в сессии:

```javascript
app.get('/set-session', (req, res) => {
  req.session.username = 'John Doe';
  res.send('Сессия установлена!');
});

app.get('/read-session', (req, res) => {
  const username = req.session.username;
  res.send(`Привет, ${username}!`);
});
```

В этом примере, при посещении `/set-session` устанавливается переменная `username` в сессии, а при посещении `/read-session` мы можем получить значение этой переменной.

Express с сессиями предоставляет гибкий механизм для хранения данных между запросами, что особенно полезно для аутентификации пользователей и других сценариев.

## 11. Аутентификация и Авторизация

### 11.1 Простая Аутентификация

Express предоставляет гибкие возможности для реализации аутентификации в приложении. Начнем с простого примера:

```javascript
const express = require('express');
const basicAuth = require('express-basic-auth');
const app = express();

const users = {
  'john': 'secret123',
  'mary': 'letmein'
};

app.use(basicAuth({
  users,
  challenge: true,
  unauthorizedResponse: 'Unauthorized'
}));

app.get('/private', (req, res) => {
  res.send('Приватная информация');
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
```

В этом примере мы используем middleware `express-basic-auth` для простой HTTP-аутентификации. Зарегистрированные пользователи и их пароли указываются в объекте `users`.

### 11.2 JSON Web Token (JWT) для Аутентификации

Для более безопасной аутентификации, часто используется JSON Web Token (JWT). Установим необходимый пакет:

```bash
npm install jsonwebtoken
```

Пример использования JWT для аутентификации:

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.get('/login', (req, res) => {
  const username = 'john_doe';
  const token = jwt.sign({ username }, 'my-secret-key', { expiresIn: '1h' });
  res.json({ token });
});

app.get('/protected', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, 'my-secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    res.json({ message: 'Доступ разрешен', user: decoded.username });
  });
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
```

В этом примере, при посещении `/login` генерируется JWT и отправляется обратно клиенту. При посещении `/protected`, сервер проверяет наличие и валидность JWT в заголовке запроса.

Express предоставляет различные стратегии для аутентификации, и выбор зависит от требований вашего приложения.

## 12. Работа с WebSocket

Express по умолчанию не поддерживает WebSocket, но вы можете легко интегрировать WebSocket в свое приложение, используя пакет `socket.io`. Установим его:

```bash
npm install socket.io
```

Пример использования WebSocket с `socket.io`:

```javascript
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('Пользователь подключился');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('Пользователь отключился');
  });
});

server.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
```

В данном примере, при подключении к `/`, пользователю отправляется HTML-страница с простым интерфейсом чата. WebSocket используется для обмена сообщениями между клиентами.

HTML-страница (`index.html`):

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WebSocket Chat</title>
  <script src="/socket.io/socket.io.js"></script>
  <script>
    const socket = io();

    document.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      const message = document.getElementById('m').value;
      socket.emit('chat message', message);
      document.getElementById('m').value = '';
      return false;
    });

    socket.on('chat message', (msg) => {
      const messages = document.getElementById('messages');
      const li = document.createElement('li');
      li.textContent = msg;
      messages.appendChild(li);
    });
  </script>
</head>
<body>
  <ul id="messages"></ul>
  <form action="">
    <input id="m" autocomplete="off" /><button>Отправить</button>
  </form>
</body>
</html>
```

Это простой пример использования WebSocket с `socket.io`. В реальном приложении вы можете создать более сложный чат, игру или другие приложения, требующие мгновенного обмена данными между клиентами.

## 13. Тестирование Express-приложений

Тестирование является важной частью разработки, и для Express-приложений также существует множество инструментов для проведения автоматизированных тестов. Рассмотрим базовый пример с использованием фреймворка тестирования `mocha` и библиотеки `chai`.

### 13.1 Установка зависимостей

Установим необходимые пакеты для тестирования:

```bash
npm install mocha chai supertest --save-dev
```

- `mocha`: фреймворк для написания и запуска тестов.
- `chai`: библиотека с утверждениями для тестов.
- `supertest`: библиотека для тестирования HTTP-запросов.

### 13.2 Пример тестового файла

Создадим простое приложение Express и напишем тесты для него:

```javascript
// app.js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Привет, мир!');
});

module.exports = app;
```

```javascript
// test/app.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Express App', () => {
  it('возвращает "Привет, мир!" по запросу /', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal('Привет, мир!');
        done();
      });
  });
});
```

### 13.3 Запуск тестов

Добавим команду для запуска тестов в файл `package.json`:

```json
"scripts": {
  "test": "mocha"
}
```

Теперь вы можете запустить тесты, выполнив команду:

```bash
npm test
```

Этот пример представляет базовое тестирование Express-приложения. В реальных проектах тесты могут быть более обширными и включать в себя различные сценарии использования вашего приложения.

## 14. Fetch на Клиенте и Настройка CORS

### 14.1 Использование Fetch на Клиенте

**Fetch** - это современный API для выполнения сетевых запросов в браузере. Он предоставляет более мощный и гибкий способ взаимодействия с серверами в сравнении с устаревшими методами, такими как `XMLHttpRequest`. Вот основные аспекты работы с `fetch`:

#### Простой GET-запрос:

```javascript
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Ошибка:', error));
```

Этот пример отправляет GET-запрос по адресу `https://api.example.com/data`, парсит ответ в формате JSON и выводит данные в консоль.

#### POST-запрос с телом:

```javascript
const requestData = {
  username: 'john_doe',
  password: 'secret123'
};

fetch('https://api.example.com/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    // Другие заголовки по необходимости
  },
  body: JSON.stringify(requestData),
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Ошибка:', error));
```

Этот пример отправляет POST-запрос по адресу `https://api.example.com/login` с JSON-данными в теле.

#### Настройка Заголовков:

```javascript
const headers = new Headers();
headers.append('Authorization', 'Bearer your_token');
headers.append('Content-Type', 'application/json');

fetch('https://api.example.com/data', {
  method: 'GET',
  headers: headers,
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Ошибка:', error));
```

Здесь создаются и добавляются заголовки в объект `Headers`, который затем передается в опции `headers` при использовании `fetch`.

#### Работа с CORS:

```javascript
fetch('https://api.example.com/data', {
  method: 'GET',
  mode: 'cors', // Указываем, что нужен CORS
  credentials: 'include', // Разрешаем отправку куки и заголовков аутентификации
  headers: {
    'Authorization': 'Bearer your_token',
    'Content-Type': 'application/json',
    // Другие заголовки по необходимости
  },
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Ошибка:', error));
```

Здесь используются опции `mode` для указания режима CORS и `credentials` для разрешения отправки куки и заголовков аутентификации.

#### Обработка Ответов:

```javascript
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Ошибка:', error));
```

В этом примере делается проверка на успешность ответа (метод `ok`), и если ответ не успешен, выбрасывается исключение.

`fetch` позволяет очень гибко настраивать запросы, и, вместе с правильной настройкой CORS на сервере, обеспечивает безопасное взаимодействие между клиентом и сервером.

### 14.2 Настройка CORS на Сервере

**Cross-Origin Resource Sharing (CORS)** — это механизм, который позволяет ограничивать запросы на доступ к ресурсам веб-страницы из другого домена. Это важная часть безопасности веб-приложений, так как предотвращает несанкционированный доступ к ресурсам на стороне сервера.

Для настройки CORS в Express, вы можете использовать пакет `cors`. Установите его:

```bash
npm install cors
```

Когда веб-страница делает запрос на домен, отличный от того, на котором она была загружена, вступают в силу политики Same-Origin Policy (SOP), которые по умолчанию запрещают такие запросы. CORS предоставляет серверам возможность указать, какие домены им разрешено делать запросы.

### 14.3 Основные аспекты CORS:

#### 1. Заголовки CORS

CORS основан на использовании HTTP-заголовков. Важные заголовки CORS включают:

- **Origin**: Заголовок, отправляемый браузером в запросе, указывающий на источник запроса.
- **Access-Control-Allow-Origin**: Заголовок, отправляемый сервером в ответе, указывающий, какие источники могут получить доступ к ресурсу.
- **Access-Control-Allow-Methods**: Заголовок, указывающий, какие методы запросов разрешены при доступе к ресурсу.
- **Access-Control-Allow-Headers**: Заголовок, указывающий, какие заголовки разрешены при доступе к ресурсу.
- **Access-Control-Allow-Credentials**: Заголовок, указывающий, что при запросе могут передаваться куки и заголовки аутентификации.
- **Access-Control-Expose-Headers**: Заголовок, указывающий, какие заголовки могут быть доступны в ответе на запрос клиента.

#### 2. Простые и Непростые Запросы

CORS различает простые и непростые запросы.

- **Простые запросы**: Обычно это GET, HEAD, или POST запросы, которые не добавляют дополнительных сложностей в процессе запроса. Все простые запросы автоматически отправляются с заголовком `Origin`, и сервер может утверждать или отклонять запрос с помощью заголовка `Access-Control-Allow-Origin`.

- **Непростые запросы**: Обычно это запросы с использованием методов PUT, DELETE, заголовков Content-Type отличных от `application/x-www-form-urlencoded`, `multipart/form-data` или `text/plain`. Перед выполнением непростого запроса браузер сначала отправляет запрос с методом `OPTIONS` (префлайт-запрос) для проверки, разрешен ли такой запрос. Сервер должен ответить на префлайт-запрос соответствующими заголовками.

#### 3. Настройка CORS в Express

В Express для настройки CORS обычно используется middleware `cors`. В простейшем случае, можно включить CORS для всех доменов следующим образом:

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
```

Этот код включит CORS и разрешит доступ со всех доменов. Вы также можете конфигурировать `cors` для более тонкой настройки, например, разрешив доступ только для определенных доменов или методов.

Пример конфигурации `cors` с ограничением доступа:

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

const corsOptions = {
  origin: 'https://allowed-domain.com',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['Content-Disposition'], // Дополнительно разрешаем заголовок
};

app.use(cors(corsOptions));
```

Это позволит только `https://allowed-domain.com` делать запросы к вашему серверу.
