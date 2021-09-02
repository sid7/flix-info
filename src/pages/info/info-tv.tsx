import cn from "classnames";
import { Link } from "react-router-dom";
import Scroller from "../../components/scroller";
import { A } from "../../components/utils";
import useTitle from "../../hooks/doc-title";
import { img } from "../../scripts/tmdb-helper";
import {
  genTitle,
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
    start: data.first_air_date?.split("-")[0],
    end: /Cancled|Ended/i.test(data.status) && data.last_air_date?.split("-")[0]
  };

  useTitle(genTitle(data.name, yr));

  const poster = img.poster(data.poster_path, "xl");
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
  const bg = {
    ["--backdrop" as any]: backdrop ? `url("${backdrop}")` : 0,
    ["--poster" as any]: poster ? `url("${poster}")` : 0
  };

  return (
    <main className="page page-info info-tv">
      <header
        className={cn("card", { backdrop: backdrop || poster })}
        style={bg}>
        <h1>
          {data.name} {yr.start && <small>({yr.start})</small>}
        </h1>
        <p>{genres}</p>
        <hr />
        <div className="card-body">
          {(backdrop || poster) && (
            <picture>
              {/* <source srcSet={backdrop || poster!} /> */}
              <source
                srcSet={poster || backdrop!}
                media="(min-width: 1024px)"
              />
              <img src={backdrop || poster!} alt="" />
            </picture>
          )}
          <div className="content">
            <ul className="facts">
              <li>
                <b>Status</b> {data.status}
              </li>
              <li>
                <b>Language</b> {lang}
              </li>
              <li>
                <b>RunTime</b> {runTime}
              </li>
              <li>
                <b>Type</b> {data.type}
              </li>
              <li>
                <b>Networks</b> {networks}
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
            {data.tagline && <h3>{data.tagline}</h3>}
            <p>{data.overview}</p>
          </div>
        </div>
        <dl className="card-footer" hidden={!data.created_by.length}>
          <dt>Created By —</dt>
          {data.created_by.map(({ id, name }) => (
            <dd key={id}>
              <Link className="btn btn-link" to={`/person/${id}`}>
                {name}
              </Link>
            </dd>
          ))}
        </dl>
      </header>
      <section className="sec sec-cast">
        <h3>Cast</h3>
        {cast.length > 0 ? <Scroller items={cast} /> : "—"}
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
