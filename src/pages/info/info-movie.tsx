import type { IMovieInfo } from "../../types/movie";

export default function InfoMovie(data: IMovieInfo) {
  return (
    <main className="page page-info info-movie">
      <h1>{data.title}</h1>
    </main>
  );
}
