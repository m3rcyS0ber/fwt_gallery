<script setup lang="ts">
import PaginationItem from "@/components/ui/paginationItem.vue";

const props = defineProps({
  pages: {
    type: Number,
    required: true,
  },
  activePage: {
    type: Number,
    required: false,
    default: 1,
    validator: (value: number) => value >= 1,
  },
  prevCb: {
    type: Function,
    required: false,
    default: () => {},
  },
  nextCb: {
    type: Function,
    required: false,
    default: () => {},
  },
  pageCb: {
    type: Function,
    required: false,
    default: () => {},
  },
});
function createPagination(
  activePage: number,
  totalPages: number,
): Array<number> {
  const pagination: Array<number> = [1];

  if (activePage > 2) {
    if (activePage - 2 > 1) pagination.push(-1);
    pagination.push(activePage - 1);
  }

  if (activePage > 1) pagination.push(activePage);

  if (activePage < totalPages) pagination.push(activePage + 1);

  if (activePage < totalPages - 1) {
    if (activePage < totalPages - 2) pagination.push(-1);
    pagination.push(totalPages);
  }
  return pagination;
}

const pagination = createPagination(props.activePage, props.pages);
</script>

<template>
  <div class="pagination">
    <div class="pagination-pages">
      <div
        class="pagination-prev-page"
        @click="
          () => {
            props.prevCb();
          }
        "
      >
        <PaginationItem v-if="props.activePage !== 1" :is-prev="true" />
      </div>
      <div
        v-for="i in pagination"
        :key="pagination.indexOf(i)"
        class="pagination-item-wrapper"
        @click="
          () => {
            if (i !== -1) {
              props.pageCb(i);
            }
          }
        "
      >
        <PaginationItem
          :page="i"
          :is-ellipsis="i === -1"
          :current-page="props.activePage === i"
        />
      </div>
      <div
        class="pagination-next-page"
        @click="
          () => {
            props.nextCb();
          }
        "
      >
        <PaginationItem
          v-if="props.activePage !== props.pages"
          :is-next="true"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pagination {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 20px;
  &-pages {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 4px;
    width: inherit;
  }
}
</style>
