<script setup lang="ts">
import Logo from "@/components/ui/logo.vue";
import Switcher from "@/components/ui/switcher.vue";
import { useThemeStore, availableThemes } from "@/stores/ThemeStore";

const store = useThemeStore();
const switchNext = () => {
  const themeIndex = availableThemes.indexOf(store.getCurrentTheme);
  if (themeIndex < availableThemes.length - 1) {
    store.setTheme(availableThemes[themeIndex + 1]);
  } else {
    store.setTheme(availableThemes[0]);
  }
};
</script>

<template>
  <div class="header">
    <Logo />
    <Switcher
      @click="switchNext"
      @keydown="
        () => {
          return true;
        }
      "
    ></Switcher>
  </div>
</template>

<style scoped lang="scss">
@use "@/styles/globals";
.header {
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  transition: globals.$default-transition;
}
@media (max-width: 1023px) {
  .header {
    height: 88px;
    transition: globals.$default-transition;
  }
}
@media (max-width: 767px) {
  .header {
    height: 64px;
    transition: globals.$default-transition;
  }
}
</style>
