<script lang="ts">
import AppCheckbox from '@/components/UI/AppCheckbox.vue';
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
import AppTitle from '@/components/UI/AppTitle.vue';
import CreateUserDialog from '@/components/workspace/CreateUserDialog.vue';
import AppBtn from '@/components/UI/AppBtn.vue';
import { defineComponent } from 'vue';
import type { UserInterface } from '@/interfaces/UserInterface';
import AppInput from '@/components/UI/AppInput.vue';
import AppCard from '@/components/UI/AppCard.vue';
import ArrowIcon from '@/components/UI/Icons/ArrowIcon.vue';
import AppField from '@/components/UI/AppField.vue';

export default defineComponent({
  components: {
    AppField,
    ArrowIcon,
    AppCard,
    AppInput,
    AppBtn,
    CreateUserDialog,
    AppTitle,
    AppCheckbox
  },
  data: () => {
    return {
      allUsersToggler: false,
      checkedUsers: [],
      showCreateUserDialog: false
    };
  },

  computed: {
    ...mapGetters('users', ['computedUsers']),
    ...mapState('users', ['users', 'search', 'filters', 'sorts']),
    allUsersAreChecked() {
      return this.users.length === this.checkedUsers.length;
    },
  },
  methods: {
    ...mapActions('users', ['getUsers']),
    ...mapMutations('users', ['DELETE_USER', 'DELETE_USERS', 'TOGGLE_SORTING']),
    toggleSort(property: string) {
      this.TOGGLE_SORTING(property);
    },
    toggleMainCheckbox() {
      if (this.allUsersAreChecked) {
        this.checkedUsers = [];
      } else {
        this.checkedUsers = this.users.map((user: UserInterface) => user.id);
      }
    },
    deleteUser(id: number) {
      const indexInCheckedUsers = this.checkedUsers.findIndex((checkedUserId: number) => checkedUserId === id);
      if(indexInCheckedUsers !== -1) {
        this.checkedUsers.splice(indexInCheckedUsers, 1);
      }
      this.DELETE_USER(id);
    },
    deleteUsers() {
      this.DELETE_USERS(this.checkedUsers);
    }
  },
  mounted() {
    this.getUsers();
  },
  watch: {
    checkedUsers: {
      deep: true,
      handler() {
        this.allUsersToggler = this.allUsersAreChecked;
      }
    }
  }
});


</script>

<template>
  <create-user-dialog
    v-model="showCreateUserDialog"
  />
  <app-title>
    <template #title>
      Users List
    </template>
    <template #buttons>
      <app-btn
        @click="showCreateUserDialog = true"
      >
        Create
      </app-btn>
    </template>
  </app-title>
  <app-card class="u-mb-3">
    <h3 class="u-mb-4">Filters</h3>

    <div class="u-d-flex">
      <app-field>
        <template #label>
          Search
        </template>
        <app-input v-model="filters.search"/>
      </app-field>
    </div>
  </app-card>
  <table class="c-table">
    <thead>
    <tr>
      <th>
        <input
          v-model="allUsersToggler"
          type="checkbox"
          @change="toggleMainCheckbox()"
        />
      </th>
      <th>
        <div
          :class="[
            'c-table__header__th',
            'c-table__header__th--sortable',
            {
              ['c-table__header__th--' + sorts.name]: sorts.name
            }
          ]"
          @click="toggleSort('name')"
        >
          Name
          <arrow-icon class="c-table__header__th__sort-arrow"/>
        </div>
      </th>
      <th>
        E-mail
      </th>
      <th>
        Phone
      </th>
      <th>
        Actions
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="user in computedUsers"
      :key="user.id"
    >
      <td>
        <app-checkbox
          v-model="checkedUsers"
          :value="user.id"
        />
      </td>
      <td>
        {{ user.name }}
      </td>
      <td>
        {{ user.email }}
      </td>
      <td>
        {{ user.phone }}
      </td>
      <td>
        <app-btn
          color="orange"
          @click="deleteUser(user.id)"
        >
          Delete
        </app-btn>
      </td>
    </tr>
    </tbody>
  </table>
  <div class="u-mt-4 u-d-flex u-d-flex-align-center">
    <app-btn
      :disabled="checkedUsers.length === 0"
      color="orange"
      @click="deleteUsers()"
    >
      Delete all selected ({{ checkedUsers.length }})
    </app-btn>

    <div class="u-ml-auto">
      Users count: {{ computedUsers.length }}
    </div>
  </div>
</template>

<style lang="scss" src="./assets/scss/app.scss"/>