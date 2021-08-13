import type { ICompany, IExternalIDs, IMedia, IVideo } from "../common";
import type { ICollection, ICast, ICrew, IReleaseInfo } from "./parts";

export interface IMovie {
  adult: boolean;
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  genre_ids: number[];
  overview: string;
  release_date: string;
  original_title: string;
  original_language: string;
  popularity: number;
  vote_count: number;
  vote_average: number;
  video: boolean;
}

export interface IMovieDetails extends Omit<IMovie, "genre_ids"> {
  imdb_id: string;
  tagline: string | null;
  status: string;
  budget: number;
  revenue: number;
  runtime: number | null;
  homepage: string;
  belongs_to_collection: null | ICollection;
  genres: { id: number; name: string }[];
  spoken_languages: { iso_639_1: string; name: string }[];
  production_companies: ICompany[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
}

export interface IMovieInfo extends IMovieDetails {
  external_ids: IExternalIDs;
  credits: {
    cast: ICast[];
    crew: ICrew[];
  };
  release_dates: {
    results: {
      iso_3166_1: string;
      release_dates: IReleaseInfo[];
    }[];
  };
  keywords: {
    keywords: { name: string; id: number }[];
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
