<template>
  <div class="page-title">
    <h2 class="page-title__title">
      <slot name="title"/>
    </h2>
    <div class="page-title__buttons">
      <slot name="buttons"/>
    </div>
  </div>
</template>

<style lang="scss">
.page-title {
  display: flex;
  margin-bottom: 15px;
  padding-bottom: 15px;

  &__title {
    font-size: 32px;
  }

  &__buttons {
    margin-left: auto;
    display: flex;

    > * {
      margin-left: 6px;

      &:first-child {
        margin-left: 0;
      }
    }
  }
}

</style>