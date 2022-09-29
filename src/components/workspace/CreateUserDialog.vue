<script lang="ts">
import AppDialog from '@/components/UI/AppDialog.vue';
import AppBtn from '@/components/UI/AppBtn.vue';
import { defineComponent, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { email, helpers, required } from '@vuelidate/validators';
import AppInput from '@/components/UI/AppInput.vue';
import type { UserInterface } from '@/interfaces/UserInterface';
import { useVuelidate } from '@vuelidate/core';
import { mustContainTwoWords } from '@/helpers/ValidationRules';
import AppCard from '@/components/UI/AppCard.vue';
import AppField from '@/components/UI/AppField.vue';
import AppPhoneInput from '@/components/UI/AppPhoneInput.vue';

export default defineComponent({
  name: 'CreateUserDialog',
  components: {AppPhoneInput, AppField, AppCard, AppInput, AppBtn, AppDialog},

  setup(props, {emit}) {
    const store = useStore();

    const requestPending = ref(false);
    const newUser: UserInterface = reactive({
      id: null,
      name: '',
      email: '',
      phone: ''
    });
    const rules = {
      name: {
        mustContainTwoWords: helpers.withMessage('Name & Surname Field must contain two words', mustContainTwoWords)
      },
      phone: {
        required: helpers.withMessage('Phone is required', required)
      },
      email: {
        required: helpers.withMessage('E-mail is required', required),
        email
      }
    };

    const v$ = useVuelidate(rules, newUser);

    async function runCreateUserAction() {
      const hasPassedValidation = await v$.value.$validate();

      if (!hasPassedValidation) return;

      requestPending.value = true;
      store.dispatch('users/createUser', newUser)
        .then(() => {
          closeDialog();
          v$.value.$reset();
          newUser.name = '';
          newUser.email = '';
          newUser.phone = '';

          requestPending.value = false;
        });
    }

    function closeDialog() {
      emit('update:modelValue', false);
    }

    return {
      runCreateUserAction,
      newUser,
      v$,
      closeDialog,
      requestPending
    };
  }

});
</script>
<template>
  <app-dialog>
    <template #header>
      Create New User
      <slot name="action-title"/>
    </template>
    <template #body>
      <app-field class="u-mb-2">
        <template #label>
          Name & Surname
        </template>
        <app-input v-model="newUser.name"/>
      </app-field>
      <app-field class="u-mb-2">
        <template #label>
          E-mail
        </template>
        <app-input v-model="newUser.email"/>
      </app-field>
      <app-field class="u-mb-2">
        <template #label>
          Phone number
        </template>
        <app-phone-input v-model="newUser.phone"/>
      </app-field>
      <app-card
        v-if="v$.$errors.length > 0"
        class="u-mt-3"
        color="red"
      >
        <ul>
          <li
            v-for="error of v$.$errors"
            :key="error.$uid"
          >
            {{ error.$message }}
          </li>
        </ul>
      </app-card>
    </template>
    <template #buttons>
      <app-btn
        class="u-mr-2"
        color="smoke"
        @click="closeDialog()"
      >
        Cancel
      </app-btn>
      <app-btn
        color="purple"
        @click="runCreateUserAction()"
        :loading="requestPending"
      >
        Create
      </app-btn>
    </template>
  </app-dialog>
</template>