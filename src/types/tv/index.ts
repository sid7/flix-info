import type { ICompany, IExternalIDs, IMedia, IVideo } from "../common";
import type { IEpInfo, ICredit, ICast, ICrew } from "./parts";

export interface ITv {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  first_air_date: string | null;
  origin_country: string[];
  original_name: string;
  original_language: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}
export interface ITvDetails extends Omit<ITv, "genre_ids"> {
  tagline: string;
  status: string;
  type: string;
  genres: { id: number; name: string }[];
  in_production: string;
  languages: string[];
  homepage: string;
  episode_run_time: number[];
  last_air_date: string | null;
  last_episode_to_air: IEpInfo | null;
  next_episode_to_air: IEpInfo | null;
  number_of_episodes: number;
  number_of_seasons: number;
  networks: ICompany[];
  production_companies: ICompany[];
  production_countries: { iso_3166_1: string; name: string }[];
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
  created_by: ICredit[];
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
  }[];
}

export interface ITvInfo extends ITvDetails {
  external_ids: IExternalIDs;
  credits: {
    cast: ICast[];
    crew: ICrew[];
  };
  content_ratings: { results: { iso_3166_1: string; rating: string }[] };
  keywords: {
    results: { name: string; id: number }[];
  };
  videos: {
    results: IVideo[];
  };
  recommendations: {
    page: number;
    results: IMedia[];
    total_pages: number;
    total_results: number;
  };
}
