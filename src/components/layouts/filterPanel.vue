<script setup lang="ts">
import MyButton from "@/components/ui/myButton.vue";
import SidePanel from "@/components/layouts/sidePanel.vue";
import Accordion from "@/components/ui/accordion.vue";
import MyRange from "@/components/ui/myRange.vue";
import Loading from "@/components/ui/loading.vue";
import MyInput from "@/components/ui/myInput.vue";
import { useMainStore } from "@/stores/MainStore";
import { YearRange } from "@/types/apiTypes";
import { toRefs } from "vue";
import { useModelStore } from "@/stores/ModelStore";

const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  },
});

const mainStore = useMainStore();
const { filterOptions } = toRefs(mainStore);

const onSelect = (x: any) => {
  if (x.name) {
    filterOptions.value.authorId = x.id;
  } else if (x.location) {
    filterOptions.value.locationId = x.id;
  }
};
const onRangeInput = (year: number[]) => {
  const newYearRange: YearRange = {};
  if (year[0] !== -1) newYearRange.from = year.at(0);
  if (year[1] !== -1) newYearRange.to = year.at(1);
  if (Object.keys(newYearRange).length) {
    filterOptions.value.year = newYearRange;
  } else delete filterOptions.value.year;
};
</script>

<template>
  <SidePanel>
    <div v-if="!props.isLoading" class="filter-body">
      <div class="filter-body-options">
        <Accordion title="Artist" name="filter-artist">
          <MyInput
            type="select"
            placeholder="Select the artist"
            :select-options="mainStore.getAuthors"
            :select-cb="onSelect"
            :unselect-cb="() => delete filterOptions.authorId"
            model-name="artist"
          />
        </Accordion>
        <Accordion title="Location" name="filter-location">
          <MyInput
            type="select"
            placeholder="Select the location"
            :select-options="mainStore.getLocations"
            :select-cb="onSelect"
            :unselect-cb="() => delete filterOptions.locationId"
            :unmount-cb="
              () =>
                filterOptions.locationId ||
                useModelStore().setModelValue('location', '')
            "
            model-name="location"
          />
        </Accordion>
        <Accordion title="Year" name="filter-year">
          <MyRange
            model-name-from="yearFrom"
            model-name-to="yearTo"
            :input-cb="onRangeInput"
          />
        </Accordion>
      </div>
      <div class="filter-body-buttons">
        <MyButton
          text="show the results"
          :disabled="!Object.keys(filterOptions).length"
          @click="async () => await mainStore.refreshPaintings()"
        />
        <MyButton
          text="clear"
          :disabled="!Object.keys(filterOptions).length"
          @click="mainStore.setFilterOptions({})"
        />
      </div>
    </div>
    <div v-else class="loading-box">
      <Loading />
    </div>
  </SidePanel>
</template>

<style scoped lang="scss">
.loading-box {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.filter-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  min-height: 523px;
  &-options {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  &-buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  @media (max-width: 767px) {
    & {
      min-height: 355px;
    }
  }
}
</style>
