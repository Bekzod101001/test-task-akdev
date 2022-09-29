<script setup>

import { computed, useSlots } from 'vue';

defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue'])
const slots = useSlots()

const isButtonsSlotExist = computed(() => {
  return !!slots.buttons
})

function closeModal () {
  emit('update:modelValue', false)
}

</script>

<template>
  <transition name="modal">
    <div
      v-show="modelValue"
      class="modal"
    >
      <div
        class="modal__overlay"
        @click="closeModal()"
      />
      <div class="modal__wrapper">
        <div class="modal__window">
          <div class="modal__header">
            <slot name="header"/>
            <button
              class="modal__close"
              @click="closeModal()"
            >
              <svg
                data-src="/img/icons/close.svg"
                height="24"
                width="24"
              />
            </button>
          </div>

          <div
            class="modal__body"
          >
            <slot name="body"/>
          </div>
          <div
            v-if="isButtonsSlotExist"
            class="modal__buttons"
          >
            <slot name="buttons"/>
          </div>
        </div>
        <slot name="info"/>
      </div>
    </div>
  </transition>
</template>

<style lang="scss">
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  transition: .3s opacity, .3s transform;
  &-enter-from, &-leave-to {
    opacity: 0;

    .modal__window, .sign-up__info {
      transform: scale(.8);
    }
  }

  &-enter-to {
    opacity: 1;

    .modal__window, .sign-up__info {
      transform: scale(1);
    }
  }

  &-enter-active, &-leave-active {
    transition: opacity .3s ease;
  }

  &__overlay {
    background-color: rgba(0, 0, 0, .5);
    position: absolute;
    @include full-sized;
  }

  &__wrapper {
    @include flex-center;
    height: 100%;
  }

  &__window {
    width: 400px;
    max-width: calc(100% - 30px);
    max-height: calc(100% - 30px);
    overflow-y: auto;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    position: relative;
    border-radius: 10px;
    transition: transform .3s;
    padding-bottom: 30px;

    @include scrollbar;
  }

  &__header {
    padding: 20px 30px;
    display: flex;
    flex-wrap: wrap;
    font-size: 18px;
    font-weight: bold;
    line-height: 1.5;
  }

  &__body {
    padding: 0 30px 30px;

    &--no-padding {
      padding-bottom: 0;
    }

    &__info-icon {
      margin-right: 5px;
    }
  }

  &__buttons {
    padding: 0 30px;
    display: flex;
  }

  &__close {
    position: absolute;
    right: 30px;
    top: 20px;
    width: 24px;
    height: 24px;

    svg {
      transition: transform .3s;
      --current-сolor: #000;
    }

    &:hover {
      svg {
        transform: rotate(90deg);
      }
    }
  }

  &__title {
    font-size: 20px;
    line-height: 28px;
    font-weight: bold;
    display: flex;
    align-items: center;
    color: $black;
  }


  &__btn {
    width: 100%;
    border-radius: 4px;
    padding: 13px 15px;
    justify-content: center;
    text-align: center;
    font-weight: bold;
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

</style>