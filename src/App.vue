<script setup lang="ts">
import Header from "@/components/layouts/header.vue";
import { useThemeStore } from "@/stores/ThemeStore";

// const selectedTheme = ref("dark");
document.title = "FWT Gallery";
const setDataTheme = (theme: string) => {
  return document.body.setAttribute("data-theme", theme);
};
const themeStore = useThemeStore();
themeStore.loadTheme();
themeStore.$subscribe((_: any, state: any) => {
  setDataTheme(state.theme);
});
setDataTheme(themeStore.getCurrentTheme);
</script>

<template>
  <div class="wrapper">
    <Header />
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style src="@/styles/style.css" />
