export interface ISearchResponse {
  page: number;
  results: ISearchResults[];
  total_pages: number;
  total_results: number;
}
export type ISearchResults = Partial<ISearchResults__TV> &
  Partial<ISearchResults__Movie> &
  Partial<ISearchResults__Person>;

export interface ISearchResults__TV {
  poster_path: string | null;
  popularity: number;
  id: number;
  overview: string;
  backdrop_path: string | null;
  vote_average: number;
  media_type: string;
  first_air_date: string;
  origin_country: string[];
  genre_ids: number[];
  original_language: string;
  vote_count: number;
  name: string;
  original_name: string;
}

export interface ISearchResults__Movie {
  adult: boolean;
  backdrop_path: string | null;
  poster_path: string | null;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface ISearchResults__Person {
  adult: boolean;
  gender: number;
  id: number;
  known_for: (ISearchResults__Movie | ISearchResults__TV)[];
  known_for_department: string;
  media_type: string;
  name: string;
  popularity: string;
  profile_path: string | null;
}
