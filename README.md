# KinoAfisha.ru - Frontend Part и платформа для других киноприложений

## Технологии

Vue.js, TypeScript (заменить на CofeeScript), Vuex, Vue-Router, SCSS

## Структура проекта (использовать: https://www.internet-technologies.ru/articles/razrabotka-masshtabnogo-prilozheniya-vue-js.html#header-7)

(ниже - черновик структуры папок и файлов, не соответствует нашему проекту)

├── index.html

├── main.js

├── api

│   └── ... # абстракции для выполнения запросов к API

├── components

│   ├── App.vue

│   └── ...

└── store

    ├── index.js          # здесь мы собираем модули и экспортируем хранилище
    
    ├── actions.js        # корневые действия
    
    ├── mutations.js      # корневые мутации
    
    └── modules
    
        ├── cart.js       # модуль корзины
        
        └── products.js   # модуль товаров
        


Проект представляет собой фронтэнд-платформу для создания виджетов с использованием базы данных [Киноинфо](http://kinoinfo.ru/) и его [API](http://kinoinfo.ru/api/).
1. Набор виджетов для Киноафиши - [kinoafisha.ru](http://kinoafisha.ru/), [код приложения](https://github.com/kinoafisharu/kinoafisha_new_front/tree/master/src/views).

В папке [public](https://github.com/kinoafisharu/kinoafisha_new_front/tree/master/public) расположены (кто знает, зачем нужна Паблик - впишите ее назначение)...

В папке ```хххх``` расположен RouterView, который по полученному URL вызывает нужный Vue-компонент приложения из папки ```kinoafisha/views``` ?.

Все пути прописаны в папке ```router```? и подгружаются 'лениво'?.

## Логика работы Views

1) [HomeView](https://github.com/kinoafisharu/kinoafisha_new_front/blob/master/src/views/HomeView.vue): Админка виджетов. Должна будет выдавать "панель управления" набором виджетов. Сейчас просто заглушка с ссылкой на FilmView.

[Просмотреть админку](https://kinoafisha-vue-dev.herokuapp.com/)

2) [FilmView](https://github.com/kinoafisharu/kinoafisha_new_front/blob/master/src/views/FilmView.vue) (заменить на ProductView): Отображает объект класса Product (здесь: фильм), по входящим данным,  получаемым от API. Использует компонент [components/FilmPoster](https://github.com/kinoafisharu/kinoafisha_new_front/blob/master/src/components/FilmPoster/FilmPoster.vue).

[Просмотреть прототип виджета Фильм](https://kinoafisha-vue-dev.herokuapp.com/film/11111)

## Логика работы [@/components](https://github.com/kinoafisharu/kinoafisha_new_front/tree/master/src/components) (родительские компоненты)

[FilmPoster](https://github.com/kinoafisharu/kinoafisha_new_front/tree/master/src/components/FilmPoster) сам собирает ссылку на постер с помощью специального правила (исходя из структуры папок на сервере)

## Папка API (внести внутрь приложения!)

1) ```base.ts``` -- объявляет и экспортирует главный объект Axios с BASE URL и добавляет интресептор для запросов, который подставляет параметр ?format=json для удобства.
2) ```film.ts``` -- импортирует главный Axios объект из ```base.ts``` и реализует методы по пути /api/film/
