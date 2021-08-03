import cn from "classnames";
import { Link } from "react-router-dom";
import Scroller from "../../components/scroller";
import { img } from "../../scripts/tmdb-helper";
import {
  mediaToScrollerItems,
  prettryMoney,
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
  const primer = data.release_date.split("-")[0];
  const genres = data.genres.map((g) => g.name).join(", ");
  const poster = img.poster(data.poster_path, "lg");
  const runTime = data.runtime ? prettyTime(data.runtime) : "-";
  const lang = langName.of(data.original_language);
  const budget = data.budget ? prettryMoney.format(data.budget) : "-";
  const revenue = data.revenue ? prettryMoney.format(data.revenue) : "-";

  const credits = cherryPickCrew(data.credits.crew);
  const cast = mediaToScrollerItems(
    data.credits.cast.map((c) => ({
      ...c,
      name: `<b>${c.name}</b> ${c.character}`
    })),
    "person"
  );
  const recommend = mediaToScrollerItems(data.recommendations.results);

  return (
    <main className={cn("page page-info info-movie")}>
      <header
        className={cn({ backdrop })}
        style={{ ["--backdrop" as any]: `url("${backdrop}")` }}>
        <div className="card-cover">
          <h1>
            {data.title} {primer && <small>({primer})</small>}
          </h1>
          <p className="pre-dot">{genres}</p>
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
              <b>Budget</b> {budget}
            </li>
            <li>
              <b>Revenue</b> {revenue}
            </li>
          </ul>
        </div>
        <section className="sec sec-desc">
          {data.tagline && <h2>{data.tagline}</h2>}
          <p>{data.overview}</p>
          <dl>
            <dt>Credit -</dt>
            {credits.map(([name, credit]) => (
              <dd key={name}>
                <Link className="btn btn-link" to={`/person/${credit.id}`}>
                  {name}
                </Link>
                {credit.job.join(", ")}
              </dd>
            ))}
          </dl>
        </section>
      </header>
      <section className="sec sec-cast">
        <h3>Cast</h3>
        <Scroller items={cast} />
      </section>
      <section className="sec sec-recommend">
        <h3>Recommendations</h3>
        <Scroller items={recommend} />
      </section>
    </main>
  );
}
