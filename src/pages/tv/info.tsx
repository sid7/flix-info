import cn from "classnames";
import { Link } from "react-router-dom";
import Scroller from "../../components/scroller";
import { A, BarLinks } from "../../components/utils";
import EpDesc from "../../components/ep-desc";
import useTitle from "../../hooks/doc-title";
import { img } from "../../scripts/tmdb-helper";
import {
  genTitle,
  prettyTime,
  mediaToScrollerItems,
  getTrailer,
  langName,
  numPluralize,
} from "../../scripts/utils";
import type { ITvInfo } from "../../types/tv";

export default function InfoTV(data: ITvInfo) {
  if (!data.seasons) {
    return null;
  }
  const yr = {
    start: data.first_air_date?.split("-")[0],
    end:
      /Cancled|Ended/i.test(data.status) && data.last_air_date?.split("-")[0],
  };

  useTitle(genTitle(data.name, { type: "TV Series", ...yr }));

  const poster = img.poster(data.poster_path, "xl");
  const backdrop = img.backdrop(data.backdrop_path, "lg");
  const genres = data.genres.map((g) => g.name).join(", ");
  const lang = langName.format(data.original_language);
  const runTime = prettyTime(data.episode_run_time[0]);
  const networks = data.networks.map((n) => n.name).join(", ");
  const trailer = getTrailer(data.videos.results);
  const cast = mediaToScrollerItems(
    data.credits.cast.map((c) => ({
      ...c,
      name: `<b>${c.name}</b> ${c.character}`,
    })),
    "person"
  );
  const recommend = mediaToScrollerItems(data.recommendations.results);
  const bg = {
    ["--backdrop" as any]: backdrop ? `url("${backdrop}")` : 0,
    ["--poster" as any]: poster ? `url("${poster}")` : 0,
  };
  const basic_info: [label: string, val: string | number][] = [
    [numPluralize("Season", data.number_of_seasons), data.number_of_seasons],
    [numPluralize("Episode", data.number_of_episodes), data.number_of_episodes],
    ["User Score", data.vote_count > 0 ? `${data.vote_average * 10}%` : "—"],
  ];

  return (
    <main className="page page-info info-tv">
      <header
        className={cn("card", { backdrop: backdrop || poster })}
        style={bg}
      >
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
                    <trailer.Icon
                      className={trailer.site}
                      height="1em"
                      width="1.25em"
                    />{" "}
                    {trailer.name}
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
      <section className="sec sec-cast" aria-labelledby="sec-title-1">
        <h3 id="sec-title-1">Main Cast</h3>
        {cast.length > 0 ? <Scroller items={cast} /> : "—"}
      </section>
      <section className="info" aria-label="info">
        <div className="wrap">
          <ul className="widget-basic-info">
            {basic_info.map(([label, val]) => (
              <li key={label}>
                <strong>{label}</strong> {val}
              </li>
            ))}
          </ul>
          <dl className="widget-links">
            <BarLinks
              scope="tv"
              id={data.id}
              ids={data.external_ids}
              homepage={data.homepage}
            />
          </dl>
        </div>
        <dl className="widget-ep-desc">
          {data.last_episode_to_air && (
            <EpDesc
              data={data.last_episode_to_air}
              label={/cancled|ended/.test(data.status) ? "Final" : "Last"}
            />
          )}
          {data.next_episode_to_air && (
            <EpDesc data={data.next_episode_to_air} label="Next" />
          )}
        </dl>
      </section>
      {recommend.length > 0 && (
        <section
          className="sec sec-recommend"
          aria-labelledby="sec-title-2"
          style={{ contentVisibility: "auto" }}
        >
          <h3 id="sec-title-2">Recommendations</h3>
          <Scroller items={recommend} />
        </section>
      )}
    </main>
  );
}
