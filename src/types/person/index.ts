import type { IMovie } from "../movie";
import type { ITv } from "../tv";

export interface IPerson {
  profile_path: string | null;
  adult: boolean;
  id: number;
  name: string;
  popularity: number;
  known_for: (ITv | IMovie)[];
}

export interface IPersonInfo extends IPerson {}
