# Test Task - Users Storage Module
# Frontend App - Vue, Typescript

Basically tried my best for making app structure "modular", with availability to extend project

Also, I used composition & options api, just for showing the level of skill in both ways of writing vue app.
CSS Methodology used: BEM

### Folders structure: 
1. store - vuex modules. 
2. api - for storing http requests to backend server
3. storageManager - for working with localStorage, because we have users data, that we need to store after refreshing page
4. interfaces - for defining interfaces for whole project
5. components
   1. UI - obviously, for storing UI components
   2. workspace - for components that use business logic of app, but **it's empty now**
6. helpers - for storing pure and static functions ("lodash" like functions)
___________________
##Task description:

Требования:
Для реализации приложения использовать Vue 2/3 + TS (Если работал с TS)
Для стилей использовать любой CSS препроцессор
Сборщик VueCLI | Vite | Webpack

Дизайн свободный, по желанию исполнителя

Из UI библиотек (при их использовании) можно использовать всё, кроме компонентов input, button. Инпуты должны представлять собой reusable stateless компоненты.
При первом заходе на страницу или же если нет данных в таблице - получать юзеров по API https://jsonplaceholder.typicode.com/users
Данные должны сохранятся при покидании/перезагрузки страницы
Валидация полей:
1. Full name - Обязательное, два слова через пробел
2. Email - Обязательное, валидный email адрес
3. Phone - Обязательное, маска +375 (XX) XXX-XX-XX
   Для валидации использовать vuelidate | vee-validate
   Сортировка по колонке Name (asc/desc alphabetically)
   Поиск по всем полям (users count должен динамическим менять при фильтрации)
   Получение/добавление/удаление пользователей реализовать с помощью Vuex


   
## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```