import { AxiosError } from "axios";

type Painting = {
  authorId: number;
  created: string;
  id: number;
  imageUrl: string;
  locationId: number;
  name: string;
};
type CompletedPainting = Omit<Painting, "authorId" | "locationId"> & {
  author: PaintingAuthor;
  location: PaintingLocation;
};
type PaintingAuthor = {
  id: number;
  name: string;
};
type PaintingLocation = {
  id: number;
  location: string;
};
type GetPaintingsResponse = {
  data: CompletedPainting[];
  pages?: number;
  error?: AxiosError | string;
};

type PaintingOptionsPage = {
  page: number;
  limit: number;
};
type YearRange = {
  from?: number;
  to?: number;
};
type PaintingOptions = {
  query?: string;
  authorId?: number;
  locationId?: number;
  year?: YearRange;
};

export {
  type Painting,
  type CompletedPainting,
  type PaintingAuthor,
  type PaintingLocation,
  type GetPaintingsResponse,
  type PaintingOptionsPage,
  type PaintingOptions,
  type YearRange,
};
