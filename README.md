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

   
## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```