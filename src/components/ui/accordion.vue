<script setup lang="ts">
import ThemeableIcon from "@/components/ui/themeableIcon.vue";
import { useModelStore } from "@/stores/ModelStore";

const props = defineProps({
  title: {
    type: String,
    required: false,
    default: "Accordion title",
  },
  name: {
    type: String,
    required: true,
  },
});

const modelStore = useModelStore();
modelStore.prepareModelValue(props.name, false);
const toggleAccordion = () => {
  modelStore.toggleModelValue(props.name);
};
</script>

<template>
  <div
    :class="`accordion ${modelStore.getModelValue(props.name) ? 'active' : ''}`"
  >
    <div class="accordion-header">
      <p class="accordion-header-title">{{ props.title.toUpperCase() }}</p>
      <div
        v-if="!modelStore.getModelValue(props.name)"
        class="accordion-collapser"
      >
        <ThemeableIcon
          :click-cb="toggleAccordion"
          name="plus"
          :with-hover="true"
        />
      </div>
      <div
        v-if="modelStore.getModelValue(props.name)"
        class="accordion-collapser expanded"
      >
        <ThemeableIcon
          :click-cb="toggleAccordion"
          name="minus"
          :with-hover="true"
        />
      </div>
    </div>
    <div v-if="modelStore.getModelValue(props.name)" class="accordion-body">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/styles/globals";
body {
  .accordion {
    display: flex;
    flex-direction: column;
    gap: 0;
    transition: globals.$default-transition;
    &-header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      &-title {
        font-size: 16px;
        font-family: "Cormorant SC Medium", serif;
        @media (max-width: 767px) {
          & {
            font-size: 12px;
          }
        }
      }
    }
    &-body {
      height: fit-content;
      max-height: 0;
      overflow: visible;
      transition: globals.$default-transition;
    }
    &-collapser {
      width: fit-content;
      height: fit-content;

      animation-name: collapsing;
      animation-duration: globals.$animation-default-time;
      animation-iteration-count: 1;
      transition: globals.$default-transition;
    }
    &.active {
      gap: 24px;
      transition: globals.$default-transition;
      & .accordion-collapser.expanded {
        animation-name: expanding;
        animation-duration: globals.$animation-default-time;
        animation-iteration-count: 1;
        transition: globals.$default-transition;
      }
      & .accordion-body {
        max-height: 100%;
        transition: globals.$default-transition;
      }
    }
    @keyframes expanding {
      from {
        transform: rotateZ(0deg);
      }
      to {
        transform: rotateZ(180deg);
      }
    }
    @keyframes collapsing {
      from {
        transform: rotateZ(90deg);
      }
      to {
        transform: rotateZ(0deg);
      }
    }
  }
}
</style>
