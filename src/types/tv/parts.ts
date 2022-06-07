import type { IGender } from "../common";

export interface IEpInfo {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  season_number: number;
  still_path: string | null;
  vote_average: number;
  vote_count: number;
  production_code: string;
}

export interface ICredit {
  id: number;
  credit_id: string;
  name: string;
  gender: IGender;
  profile_path: string | null;
}

export interface ICast extends ICredit {
  adult: boolean;
  character: string;
  known_for_department: string;
  original_name: string;
  popularity: number;
  order: number;
}

export interface ICrew extends Omit<ICast, "character" | "order"> {
  department: string;
  job: string;
}
