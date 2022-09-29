<script lang="ts">
import { computed, defineComponent, resolveComponent } from 'vue';

export default defineComponent({
  name: 'AppBtn',
  props: {
    icon: {
      type: Boolean,
      default: false
    },
    iconColor: {
      type: String,
      default: null
    },
    width: {
      type: [Number, String],
      default: () => null
    },
    height: {
      type: [Number, String],
      default: () => null
    },
    loading: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'purple',
      validate(value: string) {
        return ['orange', 'purple', 'smoke', 'silver'].includes(value);
      }
    },
    to: {
      type: [String, Object],
      default: () => null
    },
    outlined: {
      type: Boolean,
      default: false
    },
    sm: Boolean
  },
  setup(props) {
    const componentType = computed(() => {
      return props.to ? resolveComponent('nuxt-link') : 'button';
    });

    return {
      componentType
    };
  },
  computed: {

    computedWidth() {
      if (!this.width) {
        return false;
      }
      if (this.width) {
        return this.width + (typeof this.width === 'number' ? 'px' : '');
      }

      if (this.sm) {
        return 'fit-content';
      }

      return false;
    },
    computedHeight() {
      if (this.height) {
        return this.height + (typeof this.height === 'number' ? 'px' : '');
      }

      if (this.sm) {
        return '28px';
      }

      return false;
    },
    computedClasses() {
      const classes = ['btn'];

      if (this.color) classes.push('btn--' + this.color);
      if (this.outlined) classes.push('btn--outlined');
      if (!this.outlined) classes.push('btn--bg');
      if (this.loading) classes.push('btn--loading');

      return classes;
    }
  },
  methods: {
    runClickEvent(e) {
      if (this.loading) return;
      if (this.to) e.preventDefault();
    }
  }
});
</script>

<template>
  <component
    :is="componentType"
    :class="computedClasses"
    :style="{
      'width': computedWidth,
      'height': computedHeight
    }"
    :to="to"
    @click="runClickEvent"
  >
    <span
      v-show="!icon"
      class="btn__text"
    >
      <slot/>
    </span>
  </component>
</template>

<style lang="scss">
.btn {
  position: relative;
  width: fit-content;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 10px;
  height: 35px;
  @include flex-center;
  font-size: 14px;
  transition: background-color .3s;
  cursor: pointer;

  &__loading-animation {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &__icon {
    display: flex;
    margin-right: 5px;

    * {
      vertical-align: middle;
    }
  }

  &__text {
    display: flex;
    align-items: center;
    text-align: center;
    transition: all .3s;
  }

  &--bg {
    &.btn--orange {
      color: #fff;
      background-color: $orange;

      &:not(:disabled):hover {
        background-color: $orange-hover;
      }

      &:not(:disabled):active {
        background-color: $orange-active;
      }
    }

    &.btn--purple {
      color: #fff;
      background-color: $purple;

      &:not(:disabled):hover {
        background-color: $purple-hover;
      }

      &:not(:disabled):active {
        background-color: $purple-active;
      }
    }

    &.btn--input-background {
      color: $smoke;
      background-color: $gray;

      &:hover {
        background-color: $gray-darker;
      }

      &:active {
        background-color: $smoke;
      }
    }

    &.btn--line {
      color: $black;
      background-color: $line;

      &:not(:disabled):hover {
        background-color: #ecf5fc;
      }

      &:not(:disabled):active {
        background-color: #c0cad7;
      }

      svg {
        --current-color: #000;
      }
    }

    &.btn--smoke {
      color: #fff;
      background-color: $smoke;

      &:disabled {
        color: #DBE4EB;
        background-color: $smoke-hover;
      }
    }

    &.btn--silver {
      color: $body;
      background-color: $line;


      &:disabled {
        color: $gray-darker;
        background-color: $gray;
      }

      svg {
        --current-color: #000;
      }
    }

    &[disabled] {
      background-color: #dbe4eb;
      color: $smoke;
    }
  }

  &--outlined {
    border: 1px solid $gray-darker;
    color: $body;

    &.btn--placeholder {
      &:not(:disabled):hover {
        background-color: #eee;
      }

      &:not(:disabled):active {
        background-color: #ccc;
      }
    }

    &:hover {
      background-color: $gray-darker;
    }

    &:active {
      background-color: $smoke;
    }
  }

  &--loading {
    .btn__text, .btn__icon {
      opacity: 0;
    }
  }

  &--has-icon {
    padding: 0 10px !important;
    background-color: #fff;
    --current-color: #191B1D;

    .btn__icon {
      margin-right: 0;

      svg, img {
        width: 15px;
        height: 15px;
      }
    }

    &:not(:disabled) {
      &:hover {
        background-color: rgba($gray, 0.75);
      }

      &:active {
        background-color: rgba($gray-darker, 0.5);
        --current-color: #fff;
      }
    }
  }
}
</style>