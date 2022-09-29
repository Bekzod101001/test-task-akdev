<script lang="ts">
import { defineComponent } from 'vue';
import AppInput from '@/components/UI/AppInput.vue';
import { mask } from 'vue-the-mask';

export default defineComponent({
  name: 'AppPhoneInput',
  directives: {
    mask
  },
  components: {AppInput},
  props: {
    modelValue: {
      type: [Number, String],
      default: ''
    }
  },
  computed: {
    computedValue: {
      get() {
        return this.modelValue;
      },
      set(value: string | number) {
        this.$emit('update:modelValue', value);
      }
    }
  }
});
</script>

<template>
  <app-input
    v-model="computedValue"
    v-mask="'+375 (XX) XXX-XX-XX'"
    inputmode="numeric"
    onkeydown="return event.keyCode !== 38 && event.keyCode !== 40"
    onkeypress="return event.charCode >= 48 && event.charCode <= 57 || event.charCode === 44"
    type="text"
  />
</template>