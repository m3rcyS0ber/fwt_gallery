<script setup lang="ts">
import ThemeableIcon from "@/components/ui/themeableIcon.vue";

const props = defineProps({
  isNext: {
    type: Boolean,
    required: false,
  },
  isPrev: {
    type: Boolean,
    required: false,
  },
  isEllipsis: {
    type: Boolean,
    required: false,
  },
  page: {
    type: Number,
    required: false,
    default: 0,
  },
  currentPage: {
    type: Boolean,
    required: false,
  },
});
</script>

<template>
  <div v-if="props.isNext || props.isPrev" class="pagination-item prev-next">
    <ThemeableIcon :name="`arrow_no_line${props.isPrev ? '_inverse' : ''}`" />
  </div>
  <div v-else-if="props.isEllipsis" class="pagination-item ellipsis">...</div>
  <div
    v-else
    :class="`pagination-item page ${props.currentPage ? 'active' : ''}`"
  >
    {{ props.page }}
  </div>
</template>

<style scoped lang="scss">
@use "@/styles/helpers/prepareTheme" as *;
@use "@/styles/globals";

body {
  .pagination-item {
    &.page,
    &.ellipsis {
      font-family: Inter, serif;
      font-weight: 300;
      font-size: 16px;
      line-height: 22.4px;
      padding: 1px 8px;
    }
    &.page.active {
      font-weight: 500;
    }
  }

  @include getThemeInBody using ($theme) {
    .pagination-item {
      &.prev-next:hover {
        cursor: pointer;
        background-color: map-get($theme, icon-bg-hover);
        border-radius: 4px;
      }
      &.page {
        color: map-get($theme, text-primary);
        &.active {
          cursor: default;
          background-color: map-get($theme, pagination-active-bg);
          border-radius: 4px;
          transition: globals.$default-transition;
        }
        &:not(.active):hover {
          font-weight: 500;
          cursor: pointer;
          position: relative;
          &::before {
            content: "";
            height: 1px;
            width: 100%;
            position: absolute;
            background: map-get($theme, pagination-hover);
            bottom: 0;
            left: 0;
            z-index: 1;

            transition: globals.$transition-faster;
          }
        }
      }
    }
  }
}
</style>
