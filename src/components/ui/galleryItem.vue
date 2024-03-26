<script setup lang="ts">
import ThemeableIcon from "@/components/ui/themeableIcon.vue";
import { PropType, ref } from "vue";
import type { CompletedPainting } from "@/types/apiTypes";

const props = defineProps({
  painting: {
    type: Object as PropType<CompletedPainting>,
    required: true,
  },
});

const isHovered = ref(false);
</script>

<template>
  <div
    class="gallery-item"
    @mouseover="isHovered = true"
    @focusin="isHovered = true"
    @mouseleave="isHovered = false"
    @blur="isHovered = false"
  >
    <img
      :src="props.painting.imageUrl"
      alt=""
      :class="`gallery-item-image ${isHovered ? 'anim-zoom-in' : 'anim-zoom-out'}`"
    />
    <div class="gallery-item-overlay">
      <div class="overlay-button">
        <div class="overlay-button-body">
          <div class="border-box">
            <div
              :class="`button-body-block ${isHovered ? 'anim-hide-main' : 'anim-show-main'}`"
            >
              <p class="gallery-item-title">
                {{ props.painting.name.toUpperCase() }}
              </p>
              <p class="gallery-item-subtitle">{{ props.painting.created }}</p>
            </div>
            <div
              :class="`button-body-block ${isHovered ? 'anim-show-more' : 'anim-hide-more'}`"
            >
              <p class="gallery-item-title">
                {{ props.painting.author.name.toUpperCase() }}
              </p>
              <p class="gallery-item-subtitle">
                {{ props.painting.location.location.toUpperCase() }}
              </p>
            </div>
          </div>
        </div>
        <div class="overlay-button-arrow">
          <ThemeableIcon name="arrow" :with-hover="true"></ThemeableIcon>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/styles/helpers/prepareTheme" as *;
@use "@/styles/helpers/animate" as *;
@use "@/styles/globals";
@use "sass:math";
body {
  .gallery-item {
    width: 100%;
    aspect-ratio: 98/65;
    min-width: 280px;
    max-width: 392px;
    position: relative;
    transition: globals.$default-transition;
    overflow: hidden;
    &:hover {
      cursor: pointer;
    }
    &-image {
      width: 100%;
      height: 100%;
    }
    &-title {
      font-family: "Cormorant SC Medium", serif;
      font-weight: 500;
      font-size: 16px;
      line-height: 19.38px;
    }
    &-subtitle {
      font-family: Inter, serif;
      font-weight: 700;
      font-size: 12px;
      line-height: 14.52px;
    }
    &-overlay {
      position: absolute;
      bottom: 0;
      width: 100%;
    }
    .overlay-button {
      width: 100%;
      display: flex;
      flex-direction: row;
      height: fit-content;
      &-arrow {
        width: 24px;
        display: none;
        flex-direction: column;
        justify-content: center;
        align-items: start;
      }
      &-body {
        padding: 20px 0;
        width: 100%;
        max-width: 76.53%;
        .border-box {
          width: 100%;
          overflow: hidden;
          position: relative;
          .button-body-block {
            display: flex;
            flex-direction: column;
            gap: 8px;
            padding-left: 20px;
            &:last-child {
              position: absolute;
              bottom: 0;
              opacity: 0;
              pointer-events: none;
            }
          }
        }
      }
    }
    .anim-hide-main {
      @include animate(hideSlideToDown);
      opacity: 0;
    }
    .anim-show-main {
      @include animate(showSlideFromDown);
      opacity: 1;
    }
    .anim-hide-more {
      @include animate(hideSlideToLeft);
      opacity: 0;
    }
    .anim-show-more {
      @include animate(showSlideFromLeft);
      opacity: 1 !important;
    }
    .anim-zoom-in {
      @include animate(zoomIn);
      transform: scale(1.075);
    }
    .anim-zoom-out {
      @include animate(zoomOut);
      transform: scale(1);
    }
    @media (max-width: 1023px) {
      & {
        aspect-ratio: 8/5;
        transition: globals.$default-transition;
      }
      .overlay-button-arrow {
        display: flex;
      }
      .border-box {
        padding-left: 0 !important;
        &::before {
          width: 0 !important;
          transition: globals.$transition-faster;
        }
      }
      .overlay-button-body {
        padding: 12px 0;
      }
    }
    @media (max-width: 767px) {
      & {
        aspect-ratio: 56/37;
        width: calc(100% - 10px);
        transition: globals.$default-transition;
      }
      &-title {
        font-size: 12px;
        line-height: 14.53px;
      }
      &-subtitle {
        font-size: 8px;
        line-height: 9.68px;
      }
      .overlay-button-body {
        padding: 8px 0;
      }
      .button-body-block {
        gap: 4px;
      }
    }
  }
  @include getThemeInBody using ($theme) {
    .gallery-item {
      &-title {
        color: map-get($theme, primary-inverse);
      }
      &-subtitle {
        color: map-get($theme, accent);
        transition: globals.$default-transition;
      }
      .overlay-button {
        &-arrow {
          background-color: map-get($theme, accent);
          transition: globals.$default-transition;
        }
        &-body {
          background-color: map-get($theme, primary);
          transition: globals.$default-transition;
          .border-box::before {
            content: "";
            width: 2px;
            height: 100%;
            position: absolute;
            background: map-get($theme, accent);
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
