import UserStorageManager from '@/storageManager/UserStorageManager';
import UserApi from '@/api/UserApi';
import type { UserInterface } from '@/interfaces/UserInterface';
import SortingEnum from '@/enums/SortingEnum';
import { generateId } from '@/helpers/DataHelper';


export default {
  namespaced: true,
  actions: {
    async createUser({commit}, newUser: UserInterface) {
      await UserApi.create(newUser)
        .then((response) => {
          response.id = generateId();
          commit('CREATE_USER', response);
        });
    },
    getUsers({commit}) {
      const usersInStorage = UserStorageManager.get();

      if (usersInStorage && usersInStorage.length > 0) {
        commit('SET_USERS', usersInStorage);
        return;
      }

      UserApi.getAll()
        .then((response) => {
          UserStorageManager.set(response);
          commit('SET_USERS', response);
        });
    }
  },
  mutations: {
    CREATE_USER(state, newUser: UserInterface) {
      state.users.unshift(newUser);
      UserStorageManager.set(state.users);
    },
    SET_USERS(state, users: UserInterface[]) {
      state.users = users;
    },
    DELETE_USERS(state, idsForDelete: number[]) {
      state.users = state.users.filter((user: UserInterface) => {
        return !idsForDelete.includes(user.id);
      });
      UserStorageManager.set(state.users);
    },
    DELETE_USER(state, idForDelete: number) {
      const indexOfItemDelete = state.users.findIndex((user: UserInterface) => user.id === idForDelete);

      if (indexOfItemDelete === -1) throw new Error('User not found on deleting');

      state.users.splice(indexOfItemDelete, 1);

      UserStorageManager.set(state.users);
    },
    TOGGLE_SORTING(state, property: string) {
      const propertyValue: string = state.sorts[property];

      if (propertyValue === undefined) {
        throw new Error('Property for sorting not found');
      }

      let sortType = '';
      if (propertyValue === SortingEnum.EMPTY) sortType = SortingEnum.ASC;
      if (propertyValue === SortingEnum.ASC) sortType = SortingEnum.DESC;
      if (propertyValue === SortingEnum.DESC) sortType = SortingEnum.EMPTY;

      state.sorts[property] = sortType;
    },
  },
  state: {
    filters: {
      search: ''
    },
    search: '',
    sorts: {
      name: ''
    },
    users: []
  },
  getters: {
    computedUsers(state) {
      let users: UserInterface[] = state.users;

      if (state.filters.search) {
        const searchLowercase = state.filters.search.toLowerCase();
        users = users.filter((user: UserInterface) => {
          const userAsString = JSON.stringify(user).toLowerCase();
          return userAsString.includes(searchLowercase);
        });
      }
      if (state.sorts.name) {
        users = users.sort((a: UserInterface, b: UserInterface) => {
          return a.name.localeCompare(b.name);
        });
        if (state.sorts.name === SortingEnum.DESC) {
          users = users.reverse();
        }
      }

      return users;
    }
  }
};