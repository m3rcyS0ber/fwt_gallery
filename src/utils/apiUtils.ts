import axios from "axios";
import {
  Painting,
  GetPaintingsResponse,
  PaintingOptions,
  PaintingOptionsPage,
  CompletedPainting,
  PaintingAuthor,
  PaintingLocation,
} from "@/types/apiTypes";

const apiUrl: string = "https://test-front.framework.team";
type ApiParams = {
  _page?: number;
  _limit?: number;
  q?: string;
  authorId?: number;
  locationId?: number;
  created_gte?: number;
  created_lte?: number;
};
async function getPaintingsTotal(
  limit: number,
  options?: ApiParams,
): Promise<{ pages: number }> {
  try {
    const params: ApiParams = options || ({} as ApiParams);
    // eslint-disable-next-line no-underscore-dangle
    if (params._page) delete params._page;
    // eslint-disable-next-line no-underscore-dangle
    if (params._limit) delete params._limit;
    const { data } = await axios.get<Painting[]>(`${apiUrl}/paintings`, {
      params,
      headers: {
        Accept: "application/json",
      },
    });
    return {
      pages: Math.ceil(data.length / limit),
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    }
    throw new Error("unexpected error");
  }
}
export async function getPaintingAuthors(): Promise<PaintingAuthor[]> {
  try {
    const { data } = await axios.get<PaintingAuthor[]>(`${apiUrl}/authors`, {
      params: {},
      headers: {
        Accept: "application/json",
      },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    }
    throw new Error("unexpected error");
  }
}
export async function getPaintingLocations(): Promise<PaintingLocation[]> {
  try {
    const { data } = await axios.get<PaintingLocation[]>(
      `${apiUrl}/locations`,
      {
        params: {},
        headers: {
          Accept: "application/json",
        },
      },
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    }
    throw new Error("unexpected error");
  }
}
export async function completeAllPaintings(
  paintings: Painting[],
): Promise<CompletedPainting[]> {
  const paintingAuthors = await getPaintingAuthors();
  const paintingLocations = await getPaintingLocations();

  const completedPaintings: CompletedPainting[] = [];
  Object.values(paintings).map((painting) => {
    const authorOfPainting = paintingAuthors.find(
      (x) => x.id === painting.authorId,
    );
    const locationOfPainting = paintingLocations.find(
      (x) => x.id === painting.locationId,
    );
    return completedPaintings.push({
      id: painting.id,
      imageUrl: apiUrl + painting.imageUrl,
      name: painting.name,
      author: {
        id: painting.authorId,
        name: authorOfPainting ? authorOfPainting.name : "",
      },
      location: {
        id: painting.locationId,
        location: locationOfPainting ? locationOfPainting.location : "",
      },
      created: painting.created,
    });
  });
  return completedPaintings;
}
export default async function getPaintings(
  pageLimit: PaintingOptionsPage,
  options?: PaintingOptions,
): Promise<GetPaintingsResponse> {
  try {
    let params: ApiParams = {};
    if (typeof pageLimit !== "undefined") {
      params = {
        _page: pageLimit.page,
        _limit: pageLimit.limit,
      };
    }
    if (typeof options !== "undefined") {
      // eslint-disable-next-line no-underscore-dangle
      if (options.query) params.q = options.query;
      if (options.authorId) params.authorId = options.authorId;
      if (options.locationId) params.locationId = options.locationId;
      if (options.year) {
        if (options.year.from) params.created_gte = options.year.from;
        if (options.year.to) params.created_lte = options.year.to;
      }
    }
    const { data } = await axios.get<Painting[]>(`${apiUrl}/paintings`, {
      params,
      headers: {
        Accept: "application/json",
      },
    });
    const newData: CompletedPainting[] = await completeAllPaintings(data);
    const { pages } = await getPaintingsTotal(pageLimit?.limit, params);
    return {
      data: newData,
      pages,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    }
    throw new Error("unexpected error");
  }
}
