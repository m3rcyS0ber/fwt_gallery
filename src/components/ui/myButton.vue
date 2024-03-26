<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: false,
    default: "Button text",
  },
});
</script>

<template>
  <button type="button" class="button">{{ props.text.toUpperCase() }}</button>
</template>

<style scoped lang="scss">
@use "@/styles/helpers/prepareTheme" as *;
@use "@/styles/helpers/getThemeColor" as *;
@use "@/styles/globals";
.button {
  background: none;
  border: none;
  width: fit-content;
  font-family: "Inter", serif;
  font-size: 12px;
  font-weight: 700;
}
body {
  @include getThemeInBody using ($theme) {
    .button {
      color: map-get($theme, button-text);
      text-decoration: solid underline map-get($theme, button-text) 1px;
      transition: globals.$transition-faster;
      &:not(:disabled) {
        &:hover,
        &:focus {
          color: map-get($theme, button-text-hover);
          text-decoration: solid underline map-get($theme, button-text-hover)
            1px;
          cursor: pointer;
          transition: globals.$transition-faster;
        }
      }
      &:disabled {
        color: map-get($theme, button-text-disabled);
        text-decoration: solid underline map-get($theme, button-text-disabled)
          1px;
        transition: globals.$transition-faster;
      }
    }
  }
}
</style>
