<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppField'
});
</script>

<template>
  <div class="form-block">
    <label
      v-if="$slots.label"
      v-once
      class="form-block__label"
    >
      <slot name="label"/>
    </label>
    <slot/>
  </div>
</template>

<style lang="scss">
.form-block {
  &__label {
    font-size: 14px;
    margin-bottom: 8px;
    font-weight: 600;
    display: block;
  }
}
</style>