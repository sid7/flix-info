import type { IGender } from "../common";

export interface ICollection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

export interface ICast {
  adult: boolean;
  gender: IGender;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface ICrew extends Omit<ICast, "cast_id" | "character" | "order"> {
  credit_id: string;
  department: string;
  job: string;
}

export interface IReleaseInfo {
  certification: string;
  iso_639_1: string;
  release_date: string;
  type: number;
  note: string;
}
