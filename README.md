# Фронтенд - Проект экосистемы IKar

## Технологии

Фреймворк Vue.js, язык JavaScript, сервер Node.js, ?? - Vuex, Vue-Router, SCSS,

## Структура проекта (создать, используя в качестве примера: https://www.internet-technologies.ru/articles/razrabotka-masshtabnogo-prilozheniya-vue-js.html#header-7)

        

Проект представляет собой фронтэнд-платформу для создания виджетов, интерфейсов, библиотек и фронтенд частей, с использованием базы данных (пока [Киноинфо](http://kinoinfo.ru/), затем открытой БД в облачном сервисе) и [API](https://new-new-api.herokuapp.com/).


# Логика работы Views

1) [HomeView](https://github.com/kinoafisharu/kinoafisha_new_front/blob/master/src/views/HomeView.vue): Админка виджетов. Должна будет выдавать "панель управления" набором виджетов. Сейчас просто заглушка с ссылкой на FilmView. Так же есть возможность сборки spa на основе независимых виджетов-компонентов.

[Просмотреть админку](https://kinoafisha-vue-dev.herokuapp.com/)

2) [FilmView](https://github.com/kinoafisharu/kinoafisha_new_front/blob/master/src/views/FilmView.vue) (заменить на ProductView): Отображает объект класса Product (здесь: фильм), по входящим данным,  получаемым от API. Использует компонент [components/FilmPoster](https://github.com/kinoafisharu/kinoafisha_new_front/blob/master/src/components/FilmPoster/FilmPoster.vue).

[Просмотреть прототип виджета Фильм](https://kinoafisha-vue-dev.herokuapp.com/film/13) 

## Логика работы и структура [@/components](https://github.com/kinoafisharu/kinoafisha_new_front/tree/master/src/components), каждый отдельно взятый компонент содержит в себе краткое описание что он делает и для чего он нужен (если есть исключения, просьба сообщить).

## Каждый компонент может наследоваться от низкоуровневого абстрактного набора сборочных компонентов в папке global, что позволяет создавать конкретные продукты более гибко не наследуя от одного компонента, а строя его из отельных универсальных и настраиваемых частей, так же предусмотрено наследование.

## Глобальные компоненты:
1) Папка [global](https://github.com/kinoafisharu/kinoafisha_new_front/tree/master/src/components/global).
В данной папке хранятся все глобальные компоненты, принадлижащие общей библиотеке компонентов, компоненты логически разделены 
по их назначению, названия папок обязываются быть self descripted.
На данный момент соержит в себе: buttons(Кнопки) => button_sections(Секции кнопок(всплывающие)), layers(Слои для различный               интерфейсов), wrappers(Компоненты - обертки).
## Локальные компоненты:
1) [kinoinfo_components](https://github.com/kinoafisharu/kinoafisha_new_front/tree/master/src/components/kinoinfo_components) - 
компоненты страниц и виджетов kinoinfo
2) [stories_components](https://github.com/kinoafisharu/kinoafisha_new_front/tree/master/src/components/stories_components) - компоненты историй

# Папки каталога src:

## Папка [assets](https://github.com/kinoafisharu/kinoafisha_new_front/tree/master/src/assets)
Содержит в себе активно подгружаемые изображения и статикфайлы

## Папка [components](https://github.com/kinoafisharu/kinoafisha_new_front/tree/master/src/components)
Содержит в себе компоненты приложений (активные части), логика и структура описана выше

## Папка [mixins](https://github.com/kinoafisharu/kinoafisha_new_front/tree/master/src/mixins)
Содержит в себе миксины - компоненты от которых можно наследовать определенные часто используемые функции и данные

## Папка [router](https://github.com/kinoafisharu/kinoafisha_new_front/tree/master/src/router)
Содержит в себе обьект Vue Router (доки в открытом доступе) для роутинга частей приложения по Get запросам

## Папка  [api](https://github.com/kinoafisharu/kinoafisha_new_front/tree/master/src/api)
1) ```base.ts``` -- объявляет и экспортирует главный объект Axios с BASE URL и добавляет интресептор для запросов, который подставляет параметр ?format=json для удобства.
2) ```film.ts``` -- импортирует главный Axios объект из ```base.ts``` и реализует методы по пути /api/film/

# Папки корневого каталога:

## Папка [src](https://github.com/kinoafisharu/kinoafisha_new_front/tree/master/src)
 Содержит в себе все активные компоненты и части системы, весь написанный код.

## Папка [public](https://github.com/kinoafisharu/kinoafisha_new_front/tree/master/public) (корневой каталог)
Содержит в себе статикфайлы и главный html файл

## Папка dist
Содержит в себе собранное, готовое к продакшену приложение (ничего не менять)
