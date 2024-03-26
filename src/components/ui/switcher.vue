<script setup lang="ts">
// const isDarkTheme = computed(() => {
//   return store.getCurrentTheme === "dark";
// });
</script>

<template>
  <div class="theme-switcher"></div>
</template>

<style scoped lang="scss">
@use "@/styles/helpers/prepareTheme" as *;
@use "@/styles/globals";
.theme-switcher {
  height: 40px;
  width: 40px;
}
.theme-switcher:hover {
  cursor: pointer;
}
body {
  @include getThemeInBody using ($theme) {
    .theme-switcher {
      background-color: map-get($theme, switcher-icon-fill);
      $icon-url: getThemeIconPath(map-get($theme, name));
      -webkit-mask: url($icon-url) no-repeat center;
      mask: url($icon-url) no-repeat center;

      transition: globals.$default-transition;
    }
  }
}
</style>
