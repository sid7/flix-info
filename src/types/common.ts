import type { ITv, ITvInfo } from "./tv";
import type { IMovie, IMovieInfo } from "./movie";
import type { IPerson, IPersonInfo } from "./person";

export type IAnyInfo = ITvInfo | IMovieInfo | IPersonInfo;
export type IMediaType = "tv" | "movie" | "person";
export interface IMedia
  extends Partial<ITv>,
    Partial<IMovie>,
    Partial<IPerson> {
  media_type?: IMediaType;
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

export interface IVideo {
  id: string;
  /** @description country code */
  iso_3166_1: string;
  /** @description lang code */
  iso_639_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: "YouTube" | "Vimeo";
  size: number;
  type: string;
}

export interface ISpokenLang {
  english_name: string;
  iso_639_1: string;
  name: string;
}
