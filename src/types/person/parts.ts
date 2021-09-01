import { IMediaType } from "../common";

interface ICreditTv {
  name: string;
  original_name: string;
  origin_country: string[];
  first_air_date: string;
  episode_count: number;
}

interface ICreditMovie {
  adult: boolean;
  title: string;
  original_title: string;
  release_date: string;
  video: boolean;
}
export interface ICast extends Partial<ICreditTv>, Partial<ICreditMovie> {
  id: number;
  credit_id: string;
  genre_ids: number[];
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  vote_average: number;
  character: string;
  original_language: string;
  media_type: IMediaType;
}
export interface ICrew extends ICast {
  department: string;
  job: string;
}

export interface IProfileImg {
  aspect_ratio: number;
  file_path: string;
  height: number;
  width: number;
  iso_639_1: string | null;
  vote_average: number;
  vote_count: number;
}
