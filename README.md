# KinoAfisha.ru - Frontend Part и платформа для других киноприложений

## Технологии

Vue.js, TypeScript, Vuex, Vue-Router, SCSS

## Структура проекта

Проект представляет собой фронтэнд-платформу для создания киноприложений с использованием базы данных [Киноинфо](http://kinoinfo.ru/) и его [API](http://kinoinfo.ru/api/).
Приложение №1 - [kinoafisha.ru](http://kinoafisha.ru/), папка для кода приложения: ```ххххххх```

В папке ```public``` расположены ...
В папке ```хххх``` расположен RouterView, который по полученному URL вызывает нужный Vue-компонент приложения из папки ```kinoafisha/views``` ?.
Все пути прописаны в папке ```router```? и подгружаются 'лениво'?.

## Логика работы Views

1) ```HomeView```: Главная. Должна будет выдавать "панель управления" приложением. Сейчас просто заглушка с ссылкой на FilmView.
2) ```FilmView```(заменить на ProductView): Отображает объект класса Product (здесь: фильм), по входящим данным,  получаемым от API. Использует компонент ```components/FilmPoster```.

## Логика работы ```@/components``` (родительские компоненты)

```FilmPoster``` сам собирает ссылку на постер с помощью специального правила (исходя из структуры папок на сервере)

## Папка API

1) ```base.ts``` -- объявляет и экспортирует главный объект Axios с BASE URL и добавляет интресептор для запросов, который подставляет параметр ?format=json для удобства.
2) ```film.ts``` -- импортирует главный Axios объект из ```base.ts``` и реализует методы по пути /api/film/
