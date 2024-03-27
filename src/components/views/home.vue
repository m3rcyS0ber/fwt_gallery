<script setup lang="ts">
import Toolbar from "@/components/layouts/toolbar.vue";
import FilterPanel from "@/components/layouts/filterPanel.vue";
import { useModelStore } from "@/stores/ModelStore";
import { useMainStore } from "@/stores/MainStore";
import Gallery from "@/components/layouts/gallery.vue";
import Pagination from "@/components/layouts/pagination.vue";
import Loading from "@/components/ui/loading.vue";

const mainStore = useMainStore();

mainStore.refreshAll();

const modelStore = useModelStore();

modelStore.$subscribe((mutation: any, state: any) => {
  if (mutation && mutation.event && mutation.events.key === "search") {
    const tempOptions = mainStore.filterOptions;
    tempOptions.query = state.search;
    mainStore.setFilterOptions(tempOptions);
    mainStore.setPage(1);
  }
});
</script>

<template>
  <Toolbar
    search-name="search"
    :filter-cb="useModelStore().togglePanelOpen"
  ></Toolbar>
  <div class="gallery-container">
    <Gallery
      v-if="!mainStore.getLoadingState"
      :paintings="mainStore.getPaintings"
    ></Gallery>
    <Pagination
      v-if="!mainStore.getLoadingState && mainStore.getPaintings.length"
      :pages="mainStore.getPagesCount"
      :active-page="mainStore.getCurrentPage"
      :next-cb="async () => await mainStore.setNextPage()"
      :prev-cb="async () => await mainStore.setPrevPage()"
      :page-cb="async (num: number) => await mainStore.setPage(num)"
    />
  </div>

  <Loading v-if="mainStore.getLoadingState" />
  <FilterPanel :is-loading="mainStore.getLoadingState" />
</template>

<style scoped lang="scss">
.gallery-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  @media (max-width: 767px) {
    & {
      gap: 32px;
    }
  }
}
</style>
