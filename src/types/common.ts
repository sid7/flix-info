import { ITvInfo } from "./tv-info";
import { IMovieInfo } from "./movie-info";
import { IPersonInfo } from "./person-info";

export type IAnyInfo = ITvInfo | IMovieInfo | IPersonInfo;
