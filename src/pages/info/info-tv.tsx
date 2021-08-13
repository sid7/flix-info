import cn from "classnames";
import { Link } from "react-router-dom";
import Scroller from "../../components/scroller";
import { A } from "../../components/utils";
import { img } from "../../scripts/tmdb-helper";
import {
  prettyTime,
  mediaToScrollerItems,
  getTrailer
} from "../../scripts/utils";
import type { ITvInfo } from "../../types/tv";

const langName = new (Intl as any).DisplayNames(["en"], { type: "language" });

export default function InfoTV(data: ITvInfo) {
  if (!data.seasons) {
    return null;
  }
  const yr = {
    start: data.first_air_date.split("-")[0],
    end: /Cancled|Ended/i.test(data.status) && data.last_air_date.split("-")[0]
  };
  const poster = img.poster(data.poster_path, "lg");
  const backdrop = img.backdrop(data.backdrop_path, "lg");
  const genres = data.genres.map((g) => g.name).join(", ");
  const lang = langName.of(data.original_language);
  const runTime = prettyTime(data.episode_run_time[0]);
  const networks = data.networks.map((n) => n.name).join(", ");
  const trailer = getTrailer(data.videos.results);
  const cast = mediaToScrollerItems(
    data.credits.cast.map((c) => ({
      ...c,
      name: `<b>${c.name}</b> ${c.character}`
    })),
    "person"
  );
  const recommend = mediaToScrollerItems(data.recommendations.results);

  return (
    <main className="page page-info info-tv">
      <header
        className={cn({ backdrop })}
        style={{ ["--backdrop" as any]: `url("${backdrop}")` }}>
        <div className="card-cover">
          <h1>
            {data.name} {yr.start && <small>({yr.start})</small>}
          </h1>
          <p>{genres}</p>
          <hr />
          {poster && <img className="poster" src={poster} alt="" />}
          <ul>
            <li>
              <b>Status</b> {data.status}
            </li>
            <li>
              <b>RunTime</b> {runTime}
            </li>
            <li>
              <b>Language</b> {lang}
            </li>
            <li>
              <b>Networks</b> {networks}
            </li>
            <li>
              <b>Type</b> {data.type}
            </li>
            <li>
              <b>Trailer{trailer?.official && " (Official)"}</b>{" "}
              {trailer ? (
                <A className="btn btn-link" href={trailer.url}>
                  {trailer.name} | {trailer.site}
                </A>
              ) : (
                "—"
              )}
            </li>
          </ul>
        </div>
        <section className="sec sec-desc">
          {data.tagline && <h2>{data.tagline}</h2>}
          <p>{data.overview}</p>
          <dl>
            <dt>Created By —</dt>
            {data.created_by.map(({ id, name }) => (
              <dd key={id}>
                <Link className="btn btn-link" to={`/person/${id}`}>
                  {name}
                </Link>
              </dd>
            ))}
          </dl>
        </section>
      </header>
      <section className="sec sec-cast">
        <h3>Cast</h3>
        {cast.length > 0 ? <Scroller items={cast} /> : '—'}
      </section>
      {recommend.length > 0 && (
        <section
          className="sec sec-recommend"
          style={{ contentVisibility: "auto" }}>
          <h3>Recommendations</h3>
          <Scroller items={recommend} />
        </section>
      )}
    </main>
  );
}
