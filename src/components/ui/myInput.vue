<script setup lang="ts">
import ThemeableIcon from "@/components/ui/themeableIcon.vue";
import { PropType, ref } from "vue";
import { useModelStore } from "@/stores/ModelStore";

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (val: string) => {
      return ["text", "number", "search", "select"].includes(val);
    },
  },
  placeholder: {
    type: String,
    required: false,
    default: "",
  },
  withIcon: {
    type: String,
    required: false,
    default: "",
  },
  selectOptions: {
    type: Array<object>,
    required: false,
    default: [] as PropType<object>,
  },
  modelName: {
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
    default: 9999,
  },
  inputCb: {
    type: Function,
    required: false,
    default: () => {},
  },
  selectCb: {
    type: Function,
    required: false,
    default: () => {},
  },
  unselectCb: {
    type: Function,
    required: false,
    default: () => {},
  },
});

const modelStore = useModelStore();
const inputIsEmpty = ref(true);
const expandState = ref(false);
const filteredOptions = ref(props.selectOptions);

if (props.type !== "search") {
  modelStore.prepareModelValue(
    props.modelName,
    props.type === "text" ? "" : NaN,
  );
}

const doFilterOptions = () => {
  if (props.selectOptions?.length) {
    return props.selectOptions?.filter((x: any) =>
      (x.name || x.location)
        .toLowerCase()
        .includes(modelStore.getModelValue(props.modelName).toLowerCase()),
    );
  }
  return [];
};

/*

      SET SELECT EXPAND STATE

 */
function setExpandState(bool: boolean) {
  const selectDiv = document.querySelector(
    `.anyInput.anyInput-select.anyInput-${props.modelName} .overlay`,
  ) as HTMLDivElement;
  if (bool) {
    expandState.value = bool;
    if (!selectDiv.classList.contains("expanded")) {
      selectDiv.classList.add("expanded");
    }
    if (selectDiv.classList.contains("collapsed")) {
      selectDiv.classList.remove("collapsed");
    }
  } else {
    expandState.value = bool;
    if (!selectDiv.classList.contains("collapsed")) {
      selectDiv.classList.add("collapsed");
    }
    if (selectDiv.classList.contains("expanded")) {
      selectDiv.classList.add("expanded");
    }
  }
}
/*

      FOCUS EVENTS

 */
function focusInInput() {
  let inputDiv = document.querySelector(".anyInput.anyInput-search");
  if (props.type !== "search") {
    inputDiv = document.querySelector(`.anyInput.anyInput-${props.modelName}`);
  }
  if (inputDiv) {
    if (!inputDiv.classList.contains("anyInput-focus")) {
      inputDiv.classList.add("anyInput-focus");
    }
  }
  if (props.type === "select") {
    setExpandState(true);
    document.addEventListener("mousedown", (e: any) => {
      if (!inputDiv?.contains(e.target)) {
        setExpandState(false);
      }
    });
  }
}
function focusOutInput() {
  let inputDiv = document.querySelector(".anyInput.anyInput-search");
  if (props.type !== "search") {
    inputDiv = document.querySelector(`.anyInput.anyInput-${props.modelName}`);
  }
  if (inputDiv) {
    if (inputDiv.classList.contains("anyInput-focus")) {
      inputDiv.classList.remove("anyInput-focus");
    }
  }
  // if (props.type === "select") setExpandState(false);
}
function setModelValue(val: any) {
  const input = document.querySelector(
    `input[name='input-${props.modelName}']`,
  ) as HTMLInputElement;
  input.value = val;
  return modelStore.setModelValue(props.modelName, val);
}
const clearTextValue = () => {
  modelStore.setSearchValue("");
  inputIsEmpty.value = true;
};
const oldInputValue = ref("");
const onTextInput = (e: Event) => {
  const targetElem = e.target as HTMLInputElement;
  if (props.type === "search") {
    modelStore.setSearchValue(targetElem.value);
    inputIsEmpty.value = !targetElem.value.length;
  } else if (props.type === "number") {
    let validVal = Number.parseInt(
      (targetElem.value.match(/\d+/g) || []).join(""),
      10,
    );
    if (validVal > props.max) {
      validVal = Number.parseInt(oldInputValue.value, 10);
    } else if (validVal < props.min) {
      validVal = Number.parseInt(oldInputValue.value, 10);
    }
    setModelValue(validVal);
  } else if (props.type === "text" || props.type === "select") {
    setModelValue(targetElem.value);
    if (props.type === "select") {
      if (!targetElem.value.length) props.unselectCb();
      filteredOptions.value = doFilterOptions();
    }
  }
  if (props.inputCb?.length) {
    props.inputCb(modelStore.getModelValue(props.modelName));
  } else {
    props.inputCb();
  }
};
const onOptionSelected = (option: any) => {
  setModelValue(option.name || option.location);
  props.selectCb(option);
  setExpandState(false);
};
</script>

<template>
  <div v-if="props.type === 'search'" class="anyInput anyInput-search">
    <ThemeableIcon name="search" />
    <input
      type="text"
      name="input-search"
      aria-label="input-search"
      :placeholder="props.placeholder"
      :value="modelStore.getSearchValue"
      @input="onTextInput"
      @focusin="focusInInput"
      @focusout="focusOutInput"
    />
    <ThemeableIcon
      name="clear"
      :class="`clear-button ${inputIsEmpty ? 'hidden' : ''}`"
      :with-hover="true"
      :click-cb="clearTextValue"
    />
  </div>
  <div
    v-if="props.type === 'text' || props.type === 'number'"
    :class="`anyInput anyInput-${props.modelName}`"
  >
    <ThemeableIcon v-if="!!props.withIcon?.length" :name="props.withIcon" />
    <input
      type="text"
      :name="`input-${props.modelName}`"
      :aria-label="`input-${props.modelName}`"
      :placeholder="props.placeholder"
      :value="modelStore.getModelValue(props.modelName) || ''"
      @beforeinput="
        (e) => {
          oldInputValue = (e.target as HTMLInputElement).value;
        }
      "
      @input="onTextInput"
      @focusin="focusInInput"
      @focusout="focusOutInput"
    />
  </div>
  <div
    v-if="props.type === 'select'"
    :class="`anyInput anyInput-select anyInput-${props.modelName}`"
  >
    <input
      type="text"
      :name="`input-${props.modelName}`"
      :aria-label="`input-${props.modelName}`"
      :placeholder="props.placeholder"
      :value="modelStore.getModelValue(props.modelName) || ''"
      @input="onTextInput"
      @focusin="focusInInput"
      @focusout="focusOutInput"
    />
    <ThemeableIcon
      :name="`expand${expandState ? '_active' : ''}`"
      :class="`expand-button`"
      :with-hover="true"
      :click-cb="() => setExpandState(!expandState)"
    />
    <div v-scrollable="expandState" class="overlay">
      <div
        :class="`overlay-list scrollbar-body ${filteredOptions.length <= 5 ? 'not-scrollable' : ''}`"
      >
        <div
          v-for="option in filteredOptions"
          :key="filteredOptions?.indexOf(option)"
          class="overlay-list-option"
          @click="onOptionSelected(option)"
        >
          {{ (option as any).name || (option as any).location }}
        </div>
        <div
          v-if="!filteredOptions.length"
          class="overlay-list-option disabled"
        >
          There are no matching results for your query.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/styles/helpers/prepareTheme" as *;
@use "@/styles/helpers/animate" as *;
@use "@/styles/globals";
@use "sass:selector";
body {
  .anyInput {
    padding: 8px 16px;
    display: flex;
    flex-direction: row;
    gap: 12px;
    justify-content: start;
    align-items: center;
    border-radius: 4px;
    transition: globals.$default-transition;
    position: relative;
    font-family: Inter, serif;
    font-weight: 300;
    & input {
      font-size: 14px;
      line-height: 19.6px;
      width: 100%;
      padding: 0;
      margin: 0;
      background-color: transparent;
      outline: none;
      border: none;
    }
    &-select {
      overflow: visible;
      .overlay {
        position: absolute;
        z-index: 99;
        left: 0;
        top: 105%;
        width: 100%;
        padding-bottom: 20px;
        overflow: hidden;
        &-list {
          display: none;
          width: 100%;
          height: 100%;
          border-radius: 0 0 4px 4px;
          overflow: hidden;
          &-option {
            font-size: 14px;
            line-height: 19.6px;
            padding: 8px 16px;
          }
        }
        &.expanded {
          & .overlay-list {
            padding-top: 12px;
            display: flex;
            flex-direction: column;
            transition: globals.$transition-faster;
          }
        }
        &.collapsed {
          & .overlay-list {
            padding-top: 12px;
            display: flex;
            height: 0 !important;
            flex-direction: column;
            transition: globals.$transition-faster;
          }
        }
      }
      @media (max-width: 767px) {
        & input,
        & .overlay-list-option {
          font-size: 12px;
        }
      }
    }
    & .clear-button.hidden {
      opacity: 0;
      pointer-events: none;
      transition: globals.$transition-faster;
    }
    & input[type="searchInput"]:focus ~ .clear-button {
      opacity: 1;
      pointer-events: all;
      transition: globals.$transition-faster;
      &.hidden {
        opacity: 0;
        pointer-events: none;
        transition: globals.$transition-faster;
      }
    }
  }
  @include getThemeInBody using ($theme) {
    .anyInput {
      background-color: map-get($theme, searchbar-bg);
      border: 1px solid map-get($theme, searchbar-border);
      & input {
        color: map-get($theme, text-primary);
        &::placeholder,
        &::-ms-input-placeholder,
        &:-ms-input-placeholder,
        &::-moz-placeholder,
        &:-moz-placeholder,
        &::-webkit-input-placeholder {
          color: map-get($theme, text-secondary);
        }
      }
      &-focus {
        border: 1px solid map-get($theme, searchbar-border-focus);
        transition: globals.$transition-faster;
      }
      &-select {
        .overlay-list {
          background-color: map-get($theme, icon-bg);
          transition: globals.$transition-faster;
          &-option {
            background-color: transparent;
            color: map-get($theme, text-primary);
            transition: globals.$transition-faster;
            &.disabled {
              color: map-get($theme, text-tertiary);
            }
            &:not(.disabled):hover {
              cursor: pointer;
              background-color: map-get($theme, icon-bg-hover);
              transition: globals.$transition-faster;
            }
          }
        }
      }
      .overlay.expanded {
        @include animate(expanding);
        opacity: 1;
        height: 190px;
      }
      .overlay.collapsed {
        @include animate(collapsing);
        opacity: 0;
        height: 0;
      }
    }
  }
}
</style>
