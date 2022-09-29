<script lang="ts">
import { computed, defineComponent } from 'vue';
import TickIcon from '@/components/UI/Icons/TickIcon.vue';
import { generateId } from '@/helpers/DataHelper';

export default defineComponent({
  components: {TickIcon},
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    value: {
      type: [Number, String],
      default: null
    }
  },
  emits: ['change', 'update:modelValue'],
  setup(props, {emit}) {

    const computedValue = computed(() => {
      return props.value;

    });
    const computedChecked = computed(() => {
      return props.modelValue.includes(props.value);
    });

    function change() {
      if (props.modelValue.includes(props.value)) {
        const index = props.modelValue.findIndex(item => item === props.value);
        props.modelValue.splice(index, 1);
      } else {
        props.modelValue.push(props.value);
      }
      emit('change', computedValue.value);
    }

    const id = generateId();
    return {
      id,
      change,
      computedChecked,
      computedValue
    };
  }
});

</script>

<template>
  <div class="checkbox">
    <input
      :id="id"
      :checked="computedChecked"
      :value="computedValue"
      class="checkbox__input"
      type="checkbox"
      @change="change()"
    >
    <label
      :for="id"
      class="checkbox__label"
    >
      <span class="checkbox__label__icon">
        <tick-icon/>
      </span>
      <span
        v-if="this.$slots.label"
        v-once
        class="checkbox__label__text"
      >
        <slot name="label"/>
      </span>
    </label>
  </div>
</template>

<style lang="scss">
.checkbox {
  position: relative;

  &__input {
    position: absolute;
    left: 0;
    top: 0;
    width: 0;

    &:focus + .checkbox__label {
      .checkbox__label__icon {
        box-shadow: 0 0 12px 2px rgba(0, 0, 0, .1);
      }
    }

    &:checked + .checkbox__label {
      .checkbox__label__icon {
        background-color: $purple;
        border-color: $purple;

        svg {
          opacity: 1;
        }
      }
    }
  }

  &__label {
    color: $black;
    display: flex;
    cursor: pointer;
    user-select: none;
    text-transform: capitalize;

    a {
      color: $purple;
      display: contents;
    }

    &__icon {
      min-width: 18px;
      max-width: 18px;
      height: 18px;
      border: 1px solid #E0E3E6;
      border-radius: 4px;
      background-color: #fff;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color .3s;

      svg {
        opacity: 0;
        transition: opacity .3s;
      }
    }

    &__text {
      margin-left: 12px;
    }
  }
}
</style>