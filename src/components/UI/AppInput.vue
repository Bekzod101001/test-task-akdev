<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppInput',
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
  <input
    v-model="computedValue"
    class="c-input"
    type="text"
  />
</template>

<style lang="scss">
.c-input {
  width: 100%;
  border: 1px solid $gray-darker;
  height: 35px;
  border-radius: 4px;
  padding: 0 12px;
}
</style>