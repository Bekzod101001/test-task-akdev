<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    color: String
  }
});
</script>
<template>
  <div :class="['card', 'card--color-' + color]">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.card {
  border-radius: 8px;
  padding: 15px;
  background-color: $gray;

  &--color {
    &-red {
      background-color: $light-red;
    }
  }
}
</style>