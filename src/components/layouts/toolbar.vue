<script setup lang="ts">
import ThemeableIcon from "@/components/ui/themeableIcon.vue";

import MyInput from "@/components/ui/myInput.vue";

const props = defineProps({
  filterCb: {
    type: Function,
    required: true,
  },
  inputCb: {
    type: Function,
    required: false,
    default: () => {},
  },
});
</script>

<template>
  <div class="toolbar">
    <MyInput type="search" :input-cb="inputCb" placeholder="Painting title" />
    <ThemeableIcon
      name="filter"
      :with-bg="true"
      :with-hover="true"
      @click="
        () => {
          props.filterCb();
        }
      "
    />
  </div>
</template>

<style scoped lang="scss">
@use "@/styles/globals";
.toolbar {
  display: flex;
  flex-direction: row;
  gap: 24px;
  justify-content: end;
  align-items: center;
  transition: globals.$default-transition;
}
@media (max-width: 768px) {
  .toolbar {
    transition: globals.$default-transition;
  }
}
</style>
