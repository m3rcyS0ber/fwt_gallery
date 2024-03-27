<script setup lang="ts">
import GalleryItem from "@/components/ui/galleryItem.vue";
import { CompletedPainting } from "@/types/apiTypes";
import { useModelStore } from "@/stores/ModelStore";
import { useMainStore } from "@/stores/MainStore";

const props = defineProps({
  paintings: {
    type: Array<CompletedPainting>,
    required: false,
    default: [],
  },
});

const modelStore = useModelStore();
const mainStore = useMainStore();
</script>

<template>
  <div class="gallery">
    <div v-if="paintings.length" class="gallery-grid">
      <GalleryItem
        v-for="painting in props.paintings"
        :key="painting.id"
        :painting="painting"
      />
    </div>
    <div v-else class="gallery-empty">
      <p
        v-if="Object.keys(mainStore.getFilterOptions).toString() === 'query'"
        v-once
        class="gallery-empty-title"
      >
        No matches for
        <span class="gallery-empty-title-search">{{
          mainStore.getFilterOptions.query
        }}</span>
      </p>
      <p
        v-else-if="Object.values(mainStore.getFilterOptions).length"
        v-once
        class="gallery-empty-title"
      >
        No matches with filters
      </p>
      <p v-else class="gallery-empty-title">No matches</p>
      <p class="gallery-empty-comment">
        Please try again with a different spelling or keywords.
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/styles/helpers/prepareTheme" as *;
@use "@/styles/globals";
$layout-gap: 32px;
$columns: 3;
$column-min-width: 280px;
$column-max-width: 392px;
$gaps: calc($columns - 1);
$grid-max-width: calc(($column-max-width * $columns) + ($layout-gap * $gaps));
$gap-width: calc($gaps * $layout-gap);
$gap-addit: calc(100% - $gap-width);
$column-max-width-calc: $gap-addit / $columns;
body {
  .gallery {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    &-empty {
      display: flex;
      flex-direction: column;
      gap: 12px;
      &-title {
        font-family: Inter, serif;
        font-weight: 300;
        font-size: 16px;
        line-height: 22.4px;
        &-search {
          font-family: Inter, serif;
          font-weight: 500;
        }
      }
    }
  }
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(max($column-min-width, $column-max-width-calc), 1fr)
    );
    grid-gap: $layout-gap;
    max-width: $grid-max-width;
    align-items: center;
    justify-content: center;
    transition: globals.$default-transition;
    @media (max-width: 1300px) {
      & {
        $columns: 2;
        $gaps: calc($columns - 1);
        $grid-max-width: calc(
          ($column-max-width * $columns) + ($layout-gap * $gaps)
        );
        max-width: $grid-max-width;
      }
    }
    @media (max-width: 1023px) {
      & {
        $layout-gap: 24px;
        $columns: 2;
        $gaps: calc($columns - 1);
        $grid-max-width: calc(
          ($column-max-width * $columns) + ($layout-gap * $gaps)
        );
        max-width: $grid-max-width;
        gap: $layout-gap;
      }
    }
    @media (max-width: 767px) {
      & {
        gap: 20px;
      }
    }
    @media (max-width: 620px) {
      & {
        gap: 20px;
        $columns: 1;
        $grid-max-width: calc(($column-max-width * $columns));
        grid-template-columns: repeat(
          1,
          minmax(max($column-min-width, $column-max-width-calc), 1fr)
        );
        max-width: 320px;
      }
    }
  }

  @include getThemeInBody using ($theme) {
    .gallery-empty-comment {
      font-family: Inter, serif;
      font-size: 14px;
      font-weight: 300;
      line-height: 19.6px;
      color: map-get($theme, text-tertiary);
    }
  }
}
</style>
