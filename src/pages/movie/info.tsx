import cn from "classnames";
import { Link } from "react-router-dom";
import Scroller from "../../components/scroller";
import { A, BarLinks } from "../../components/utils";
import useTitle from "../../hooks/doc-title";
import { cherryPickCrew, langName } from "./helper";
import { img } from "../../scripts/tmdb-helper";
import {
  genTitle,
  getTrailer,
  mediaToScrollerItems,
  numPluralize,
  prettyMoney,
  prettyTime,
} from "../../scripts/utils";
import type { IMovieInfo } from "../../types/movie";

export default function InfoMovie(data: IMovieInfo) {
  if (!data.title) {
    return null;
  }
  const backdrop = img.backdrop(data.backdrop_path, "lg");
  const premiere = data.release_date.split("-")[0];

  useTitle(genTitle(data.title, { type: "Movie", start: premiere }));

  const genres = data.genres.map((g) => g.name).join(", ");
  const poster = img.poster(data.poster_path, "xl");
  const runTime = prettyTime(data.runtime);
  const lang = langName.of(data.original_language);
  const budget = prettyMoney.format(data.budget);
  const revenue = prettyMoney.format(data.revenue);

  const credits = cherryPickCrew(data.credits.crew);
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

  const userScore = data.vote_count > 0 ? `${data.vote_average * 10}%` : "—";
  const keywords = [...data.keywords.keywords];
  keywords.length = Math.min(keywords.length, 5);
  const wiData = [
    [
      numPluralize("Spoken Language", data.spoken_languages.length),
      data.spoken_languages.map((lang) => lang.english_name).join(", "),
    ],
    [
      "Production Companies",
      data.production_companies.map((a) => a.name).join(", ") || "—",
    ],
    [
      "Production Countires",
      data.production_countries.map((a) => a.name).join(", ") || "—",
    ],
  ];

  return (
    <main className="page page-info info-movie">
      <header
        className={cn("card", { backdrop: backdrop || poster })}
        style={bg}
      >
        <h1>
          {data.title} {premiere && <small>({premiere})</small>}
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
                <b>Budget</b> {budget}
              </li>
              <li>
                <b>Revenue</b> {revenue}
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
        <dl className="card-footer" hidden={!credits.length}>
          <dt>Credit —</dt>
          {credits.map(([name, credit]) => (
            <dd key={name}>
              <Link className="btn btn-link" to={`/person/${credit.id}`}>
                {name}
              </Link>
              {credit.job.join(", ")}
            </dd>
          ))}
        </dl>
      </header>
      <section className="info" aria-label="info">
        <div className="wrap">
          <ul className="widget-basic-info">
            <li>
              <strong>User Score</strong> {userScore}
            </li>
          </ul>
          <dl className="widget-links">
            <BarLinks
              scope="movie"
              id={data.id}
              homepage={data.homepage}
              ids={data.external_ids}
              imdb={data.imdb_id}
            />
          </dl>
        </div>
        <dl className="widget-grid-list">
          <div>
            <dt>Original Title</dt>
            <dd lang={data.original_language}>{data.original_title}</dd>
          </div>
          {wiData.map(([label, val]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{val}</dd>
            </div>
          ))}
        </dl>
        {keywords.length > 0 && (
          <dl className="widget-keywords">
            <dt>Keywords</dt>
            {keywords.map((k) => (
              <dd key={k.id}>{k.name}</dd>
            ))}
          </dl>
        )}
      </section>
      <section className="sec sec-cast">
        <h3>Cast</h3>
        {cast.length > 0 ? <Scroller items={cast} /> : "—"}
      </section>
      {recommend.length > 0 && (
        <section className="sec sec-recommend">
          <h3>Recommendations</h3>
          <Scroller items={recommend} />
        </section>
      )}
    </main>
  );
}
