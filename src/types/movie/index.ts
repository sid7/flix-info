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

export interface IMovieInfo extends IMovie {}
