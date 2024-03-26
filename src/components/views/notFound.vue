<script setup lang="ts"></script>

<template>
  <div class="error">
    <p class="error-text-code">404</p>
    <p class="error-text">Not found!</p>
  </div>
</template>

<style scoped lang="scss">
@use "@/styles/helpers/prepareTheme" as *;
.error {
  height: 100%;
  width: 100%;
  gap: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  &-text {
    font-family: Inter, serif;
    font-weight: 300;
    font-size: 24px;
    &-code {
      font-weight: 700;
      font-size: 70px;
    }
  }
}
body {
  @include getThemeInBody using ($theme) {
    .error-text {
      color: map-get($theme, text-primary);
      &-code {
        color: map-get($theme, accent);
      }
    }
  }
}
</style>
