import { defineStore } from "pinia";

type VModel = {
  name: string;
  value: any;
};

// eslint-disable-next-line import/prefer-default-export
export const useModelStore = defineStore("model", {
  state: (): {
    search: string;
    isPanelOpened: boolean;
    modelVals: VModel[];
  } => ({
    search: "",
    isPanelOpened: false,
    modelVals: [],
  }),
  getters: {
    getSearchValue: (state) => state.search,
    getPanelOpened: (state) => state.isPanelOpened,
    getModelValue: (state) => (modelName: string) =>
      state.modelVals.find((x) => x.name === modelName)?.value,
  },
  actions: {
    setSearchValue(newValue: string) {
      this.search = newValue;
    },
    togglePanelOpen() {
      this.isPanelOpened = !this.isPanelOpened;
      if (this.isPanelOpened) {
        document.body.classList.add("not-scrollable");
      } else document.body.classList.remove("not-scrollable");
    },
    setModelValue(modelName: string, modelValue: any) {
      const vmodel: VModel | undefined = this.modelVals.find(
        (x) => x.name === modelName,
      );
      if (vmodel) {
        vmodel.value = modelValue;
      } else
        this.modelVals.push({
          name: modelName,
          value: modelValue,
        });
    },
    toggleModelValue(modelName: string) {
      const vmodel: VModel | undefined = this.modelVals.find(
        (x) => x.name === modelName,
      );
      if (vmodel) {
        if (typeof vmodel.value === "boolean") vmodel.value = !vmodel.value;
      } else this.setModelValue(modelName, true);
    },
    prepareModelValue(modelName: string, defaultValue: any) {
      const vmodel: VModel | undefined = this.modelVals.find(
        (x) => x.name === modelName,
      );
      if (!vmodel) this.setModelValue(modelName, defaultValue);
    },
  },
});
