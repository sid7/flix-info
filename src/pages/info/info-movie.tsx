import { IMovieInfo } from "../../types/movie-info";

export default function InfoMovie(data: IMovieInfo) {
  return (
    <main className="page page-info info-movie">
      <h1>{data.title}</h1>
    </main>
  );
}
