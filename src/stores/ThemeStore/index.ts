import { defineStore } from "pinia";

export const availableThemes: Array<string> = ["light", "dark"];
export const themeIsAvailable = (name: string | null): boolean => {
  if (typeof name === "string") {
    return availableThemes.includes(name);
  }
  return false;
};
// eslint-disable-next-line import/prefer-default-export
export const useThemeStore = defineStore("theme", {
  state: (): {
    theme: string;
  } => ({
    theme: "dark",
  }),
  getters: {
    getCurrentTheme: (state) => state.theme,
  },
  actions: {
    setTheme(theme: string) {
      if (!themeIsAvailable(theme)) return false;
      this.theme = theme;
      return this.saveTheme();
    },
    loadTheme() {
      const loadedTheme: string | null | undefined =
        localStorage.getItem("theme");
      if (themeIsAvailable(loadedTheme)) {
        this.theme = loadedTheme || availableThemes[0];
      } else {
        this.saveTheme();
      }
    },
    saveTheme() {
      localStorage.setItem("theme", this.theme);
    },
  },
});
