import type { ITv, ITvInfo } from "./tv";
import type { IMovie, IMovieInfo } from "./movie";
import type { IPerson, IPersonInfo } from "./person";

export type IAnyInfo = ITvInfo | IMovieInfo | IPersonInfo;
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
