import type { IExternalIDs, IGender } from "../common";
import type { IMovie } from "../movie";
import type { ITv } from "../tv";
import type { ICast, ICrew, IProfileImg } from "./parts";

export interface IPerson {
  profile_path: string | null;
  adult: boolean;
  id: number;
  name: string;
  popularity: number;
  known_for: (ITv | IMovie)[];
}

export interface IPersonDetails extends IPerson {
  also_known_as: string[];
  biography: string;
  birthday: string | null;
  deathday: string | null;
  gender: IGender;
  homepage: string;
  imdb_id: string;
  known_for_department: string;
  place_of_birth: string | null;
}

export interface IPersonInfo extends IPersonDetails {
  combined_credits: {
    cast: ICast[];
    crew: ICrew[];
  };
  external_ids: IExternalIDs;
  images: {
    profiles: IProfileImg[];
  };
  tagged_images: {
    page: number;
    results: ITagImg[];
    total_pages: number;
    total_results: number;
  };
}

interface ITagImg extends IProfileImg {
  id: number;
  image_type: string;
  media_type: string;
  media: (IMovie | ITv)[];
}
