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

export type IGender = 1 | 2;

export interface ICompany {
  id: number;
  logo_path: string | null;
  name: string;
  original_country: string;
}

export interface IExternalIDs {
  facebook_id: string;
  imdb_id: string;
  instagram_id: string;
  twitter_id: string;

  /** @deprecated Defunct or no longer available   */
  freebase_mid: string;
  /** @deprecated Defunct or no longer available   */
  freebase_id: string;
  /** @deprecated Defunct or no longer available   */
  tvdb_id: string;
  /** @deprecated Defunct or no longer available   */
  tvrage_id: string;
}
