import { defineStore } from "pinia";
import {
  CompletedPainting,
  PaintingAuthor,
  PaintingLocation,
  PaintingOptions,
  PaintingOptionsPage,
} from "@/types/apiTypes";
import getPaintings, {
  getPaintingLocations,
  getPaintingAuthors,
} from "@/utils/apiUtils";

const paintingsPerPage: number = 6;
// eslint-disable-next-line import/prefer-default-export
export const useMainStore = defineStore("main", {
  state: (): {
    paintings: CompletedPainting[];
    authors: PaintingAuthor[];
    locations: PaintingLocation[];
    pageLimits: PaintingOptionsPage;
    filterOptions: PaintingOptions;
    pages: number;
    isLoading: boolean;
  } => ({
    paintings: [],
    authors: [],
    locations: [],
    pageLimits: {
      page: 1,
      limit: paintingsPerPage,
    },
    filterOptions: {},
    pages: 1,
    isLoading: true,
  }),
  getters: {
    getPaintings: (state): CompletedPainting[] => state.paintings,
    getAuthors: (state): PaintingAuthor[] => state.authors,
    getLocations: (state): PaintingLocation[] => state.locations,
    getFilterOptions: (state): PaintingOptions => state.filterOptions,
    getCurrentPage: (state): number =>
      state.pageLimits.page < 1 ? 1 : state.pageLimits.page,
    getPagesCount: (state): number => state.pages,
    getLoadingState: (state): boolean => state.isLoading,
  },
  actions: {
    rewritePaintings(data: CompletedPainting[], pages: number) {
      this.paintings = [] as CompletedPainting[];
      data.forEach((x: CompletedPainting) => {
        this.paintings.push(x);
      });
      this.pages = pages;
      this.isLoading = false;
    },
    async refreshPaintings() {
      this.isLoading = true;
      const { data, pages } = await getPaintings(
        this.pageLimits,
        this.filterOptions,
      );
      if (!data) {
        return false;
      }
      return this.rewritePaintings(data, <number>pages);
    },
    rewriteAuthors(data: PaintingAuthor[]) {
      this.authors = [] as PaintingAuthor[];
      data.forEach((x: PaintingAuthor) => {
        this.authors.push(x);
      });
      this.isLoading = false;
    },
    async refreshAuthors() {
      this.isLoading = true;
      const data = await getPaintingAuthors();
      if (!data) {
        return false;
      }
      return this.rewriteAuthors(data);
    },
    rewriteLocations(data: PaintingLocation[]) {
      this.locations = [] as PaintingLocation[];
      data.forEach((x: PaintingLocation) => {
        this.locations.push(x);
      });
      this.isLoading = false;
    },
    async refreshLocations() {
      this.isLoading = true;
      const data = await getPaintingLocations();
      if (!data) {
        return false;
      }
      return this.rewriteLocations(data);
    },
    async refreshAll() {
      await this.refreshPaintings();
      await this.refreshLocations();
      await this.refreshAuthors();
    },
    async setPage(num: number) {
      let validNum = num;
      if (num < 1) validNum = 1;
      if (num > this.getPagesCount) validNum = this.getPagesCount;
      this.pageLimits = {
        page: validNum,
        limit: paintingsPerPage,
      };
      await this.refreshPaintings();
    },
    async setNextPage() {
      await this.setPage(this.getCurrentPage + 1);
    },
    async setPrevPage() {
      await this.setPage(this.getCurrentPage - 1);
    },
    async setFilterOptions(options: PaintingOptions) {
      this.filterOptions = options;
      await this.refreshPaintings();
    },
  },
});
