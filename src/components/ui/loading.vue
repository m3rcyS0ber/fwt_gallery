<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: false,
    default: "Loading... Please wait!",
  },
});
</script>

<template>
  <div class="loading">
    <div class="loading-icon"></div>
    <div class="loading-text">{{ props.text }}</div>
  </div>
</template>

<style scoped lang="scss">
@use "@/styles/helpers/animate" as *;
@use "@/styles/helpers/prepareTheme" as *;

.loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 20px;
  &-icon {
    width: 64px;
    height: 64px;
    border-radius: 100%;
  }
  &-text {
    font-family: Inter, serif;
    font-weight: 300;
    font-size: 16px;
    line-height: 22.4px;
  }
}

body {
  @include getThemeInBody using ($theme) {
    .loading-icon {
      background-color: map-get($theme, accent);
      @include animate(loading, true, true);
    }
    .loading-text {
      color: map-get($theme, text-primary);
    }
  }
}
</style>
