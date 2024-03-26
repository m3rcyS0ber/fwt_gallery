<script setup lang="ts">
import ThemeableIcon from "@/components/ui/themeableIcon.vue";
import { useModelStore } from "@/stores/ModelStore";

const modelStore = useModelStore();
</script>

<template>
  <div
    :class="`sidePanel ${!modelStore.getPanelOpened ? 'sidePanel-hidden' : ''}`"
  >
    <div class="sidePanel-header">
      <ThemeableIcon
        name="close"
        :with-hover="true"
        @click="
          () => {
            modelStore.togglePanelOpen();
          }
        "
      />
    </div>
    <div class="sidePanel-body">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/styles/globals";
@use "@/styles/helpers/prepareTheme" as *;
body {
  .sidePanel {
    position: fixed;
    top: 0;
    left: calc(100% - 492px);
    width: 372px;
    height: 100%;
    opacity: 1;
    transform: translateX(0px);
    visibility: visible;
    z-index: 99;
    padding: 60px 100px 0 40px;

    display: flex;
    flex-direction: column;
    gap: 100px;

    transition: globals.$transition-faster;
    &-header {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: end;
    }
    &-body {
      padding-right: 32px;
    }
    &-hidden {
      transform: translateX(492px);
      opacity: 0;
      visibility: hidden;
    }
    @media (max-width: 1023px) {
      & {
        left: calc(100% - 372px);
        width: 320px;
        padding: 20px 20px 0 32px;
        gap: 136px;
        &-header {
          padding: 0 0 0 4px;
        }
        &-body {
          padding-right: 0;
        }
        &-hidden {
          transform: translateX(372px);
        }
      }
    }
    @media (max-width: 767px) {
      & {
        left: calc(100% - 280px);
        width: 240px;
        padding: 20px 20px 0 20px;
        gap: 84px;
        &-header {
          padding: 0;
        }
        &-hidden {
          transform: translateX(280px);
          opacity: 0;
          visibility: hidden;
        }
      }
    }
  }
  @include getThemeInBody using($theme) {
    .sidePanel {
      background-color: map-get($theme, sidepanel-bg);

      transition: globals.$default-transition;
    }
  }
}
</style>
