import cn from "classnames";
import { Link } from "react-router-dom";
import Scroller from "../../components/scroller";
import { A } from "../../components/utils";
import useTitle from "../../hooks/doc-title";
import { img } from "../../scripts/tmdb-helper";
import {
  genTitle,
  getTrailer,
  mediaToScrollerItems,
  formatMoney,
  prettyTime
} from "../../scripts/utils";
import type { IMovieInfo } from "../../types/movie";
import type { ICrew } from "../../types/movie/parts";

const crewLst = [
  "Characters",
  "Director",
  "Novel",
  "Story",
  "Screenplay",
  "Writer"
];

interface ICredit {
  name: string;
  id: number;
  job: string[];
  credits: Omit<ICrew, "name" | "id" | "job">[];
}
function cherryPickCrew(crew: ICrew[]) {
  const rtn: { [name: string]: ICredit } = {};
  const filterCrew = crew.filter((c) => crewLst.includes(c.job));

  for (const { name, id, job, ...credits } of filterCrew) {
    if (rtn[name]) {
      rtn[name].job.push(job);
      rtn[name].credits.push(credits);
    } else {
      rtn[name] = {
        name,
        id,
        job: [job],
        credits: [credits]
      };
    }
  }
  return Object.entries(rtn);
}

const langName = new (Intl as any).DisplayNames(["en"], { type: "language" });

export default function InfoMovie(data: IMovieInfo) {
  if (!data.title) {
    return null;
  }
  const backdrop = img.backdrop(data.backdrop_path, "lg");
  const premiere = data.release_date.split("-")[0];

  useTitle(genTitle(data.title, { start: premiere }));

  const genres = data.genres.map((g) => g.name).join(", ");
  const poster = img.poster(data.poster_path, "xl");
  const runTime = prettyTime(data.runtime);
  const lang = langName.of(data.original_language);
  const budget = data.budget ? formatMoney.format(data.budget) : "—";
  const revenue = data.revenue ? formatMoney.format(data.revenue) : "—";

  const credits = cherryPickCrew(data.credits.crew);
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
    <main className="page page-info info-movie">
      <header
        className={cn("card", { backdrop: backdrop || poster })}
        style={bg}>
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
