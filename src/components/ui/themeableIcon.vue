<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  withBg: {
    type: Boolean,
    required: false,
    default: false,
  },
  withHover: {
    type: Boolean,
    required: false,
    default: false,
  },
  clickCb: {
    type: Function,
    required: false,
    default: () => {},
  },
});

const isHovered = ref(false);
</script>

<template>
  <div
    :class="`themeable-icon-bg ${isHovered ? 'hovered' : ''}`"
    :data-bg="props.withBg"
    :data-hover="props.withHover"
    @click="
      () => {
        clickCb();
      }
    "
  >
    <div
      class="themeable-icon"
      :data-icon="props.name"
      @mouseover="isHovered = true"
      @focusin="isHovered = true"
      @mouseleave="isHovered = false"
      @blur="isHovered = false"
    ></div>
  </div>
</template>

<style scoped lang="scss">
@use "@/styles/helpers/prepareTheme" as *;
@use "@/styles/globals";
body {
  @include getThemeInBody using ($theme) {
    .themeable-icon {
      background-color: map-get($theme, icon-fill);
      transition: globals.$default-transition;
      &[data-icon="filter"]:hover {
        background-color: map-get($theme, icon-hover);
        transition: globals.$transition-faster;
      }
      &[data-icon="arrow"] {
        background-color: map-get($theme, gallery-arrow-fill);
      }
      &[data-icon="expand"] {
        background-color: map-get($theme, expand-icon);
      }
      &[data-icon="expand_active"] {
        background-color: map-get($theme, expand-icon);
      }
    }
    .themeable-icon-bg {
      &[data-bg="true"] {
        background-color: map-get($theme, icon-bg);
        padding: 6px;
        width: 24px;
        height: 24px;
        border-radius: 4px;

        transition: globals.$default-transition;
        &.hovered {
          background-color: map-get($theme, icon-bg-hover);
          transition: globals.$transition-faster;
        }
      }
    }
  }
  .themeable-icon {
    height: 20px;
    width: 20px;
    &[data-icon="search"] {
      $icon-url: getIconByName("search");
      -webkit-mask: url($icon-url) no-repeat center;
      mask: url($icon-url) no-repeat center;
    }
    &[data-icon="filter"] {
      height: 24px;
      width: 24px;
      $icon-url: getIconByName("filter");
      -webkit-mask: url($icon-url) no-repeat center;
      mask: url($icon-url) no-repeat center;
    }
    &[data-icon="plus"] {
      $icon-url: getIconByName("plus");
      -webkit-mask: url($icon-url) no-repeat center;
      mask: url($icon-url) no-repeat center;
    }
    &[data-icon="minus"] {
      $icon-url: getIconByName("minus");
      -webkit-mask: url($icon-url) no-repeat center;
      mask: url($icon-url) no-repeat center;
    }
    &[data-icon="expand"] {
      $icon-url: getIconByName("expand");
      -webkit-mask: url($icon-url) no-repeat center;
      mask: url($icon-url) no-repeat center;
      transition: globals.$transition-faster;
    }
    &[data-icon="expand_active"] {
      $icon-url: getIconByName("expand");
      transform: rotateZ(180deg);
      -webkit-mask: url($icon-url) no-repeat center;
      mask: url($icon-url) no-repeat center;
      transition: globals.$transition-faster;
    }
    &[data-icon="error"] {
      $icon-url: getIconByName("error");
      -webkit-mask: url($icon-url) no-repeat center;
      mask: url($icon-url) no-repeat center;
    }
    &[data-icon="close"] {
      $icon-url: getIconByName("close");
      -webkit-mask: url($icon-url) no-repeat center;
      mask: url($icon-url) no-repeat center;
    }
    &[data-icon="clear"] {
      height: 8px;
      width: 8px;
      $icon-url: getIconByName("close");
      -webkit-mask: url($icon-url) no-repeat center;
      mask: url($icon-url) no-repeat center;
    }
    &[data-icon="arrow"] {
      $icon-url: getIconByName("arrow");
      -webkit-mask: url($icon-url) no-repeat center;
      mask: url($icon-url) no-repeat center;
    }
    &[data-icon="arrow_no_line_inverse"] {
      transform: rotateZ(180deg);
      $icon-url: getIconByName("arrow_icon_no_line", false);
      -webkit-mask: url($icon-url) no-repeat center;
      mask: url($icon-url) no-repeat center;
    }
    &[data-icon="arrow_no_line"] {
      $icon-url: getIconByName("arrow_icon_no_line", false);
      -webkit-mask: url($icon-url) no-repeat center;
      mask: url($icon-url) no-repeat center;
    }
  }
  .themeable-icon-bg {
    &[data-hover="true"]:hover {
      cursor: pointer;
    }
  }
}
</style>
