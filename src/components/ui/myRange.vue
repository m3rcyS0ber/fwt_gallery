<script setup lang="ts">
import MyInput from "@/components/ui/myInput.vue";
import ThemeableIcon from "@/components/ui/themeableIcon.vue";
import { useModelStore } from "@/stores/ModelStore";

const props = defineProps({
  placeholderFrom: {
    type: String,
    required: false,
    default: "From",
  },
  placeholderTo: {
    type: String,
    required: false,
    default: "To",
  },
  modelNameFrom: {
    type: String,
    required: false,
    default: "",
  },
  modelNameTo: {
    type: String,
    required: false,
    default: "",
  },
  min: {
    type: Number,
    required: false,
    default: 0,
  },
  max: {
    type: Number,
    required: false,
    default: 10000,
  },
  inputCb: {
    type: Function,
    required: false,
    default: () => {},
  },
});

const modelStore = useModelStore();
const onInputFrom = () => {
  const rangeFrom = modelStore.getModelValue(props.modelNameFrom);
  const rangeTo = modelStore.getModelValue(props.modelNameTo);
  if (props.inputCb?.length) {
    props.inputCb([
      Number.isNaN(rangeFrom) ? -1 : rangeFrom,
      Number.isNaN(rangeTo) ? -1 : rangeTo,
    ]);
  } else {
    props.inputCb();
  }
};
const onInputTo = () => {
  const rangeFrom = modelStore.getModelValue(props.modelNameFrom);
  const rangeTo = modelStore.getModelValue(props.modelNameTo);
  if (props.inputCb?.length) {
    props.inputCb([
      Number.isNaN(rangeFrom) ? -1 : rangeFrom,
      Number.isNaN(rangeTo) ? -1 : rangeTo,
    ]);
  } else {
    props.inputCb();
  }
};
</script>

<template>
  <div class="anyRange">
    <div class="anyRange-from">
      <MyInput
        type="number"
        :min="props.min"
        :max="props.max"
        :model-name="props.modelNameFrom"
        :placeholder="placeholderFrom"
        :input-cb="onInputFrom"
      />
    </div>
    <ThemeableIcon name="minus" />
    <div class="anyRange-to">
      <MyInput
        type="number"
        :min="props.min"
        :max="props.max"
        :model-name="props.modelNameTo"
        :placeholder="placeholderTo"
        :input-cb="onInputTo"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.anyRange {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: fit-content;
  gap: 8px;
  &-from,
  &-to {
    width: 66px;
  }
}
</style>
