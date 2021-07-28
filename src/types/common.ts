import type { IMovie } from "./movie";
import type { IPerson } from "./person";
import type { ITv } from "./tv";

export interface IMedia
  extends Partial<ITv>,
    Partial<IMovie>,
    Partial<IPerson> {
  media_type: "tv" | "movie" | "person";
}

export interface ISearchResponse {
  page: number;
  results: IMedia[];
  total_pages: number;
  total_results: number;
}
