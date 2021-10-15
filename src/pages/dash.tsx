import {
  IconFilm,
  IconTrendingUp,
  IconTv,
  IconUser,
} from "../components/icons";
import Scroller from "../components/scroller";
import useFetchData from "../hooks/fetch-data";

export default function Dash({ scope }: { scope: string }) {
  const trendsTv = useFetchData("trending/tv/day");
  const trendsMovie = useFetchData("trending/movie/day");
  const trendsPerson = useFetchData("trending/person/day");
  return (
    <main className={`page page-dash scope-${scope}`}>
      <div>
        <h2>
          <IconTrendingUp /> Trending
        </h2>
        {trendsTv.length > 0 && (
          <section className="block block-tv">
            <h3>
              <IconTv /> TV
            </h3>
            <Scroller items={trendsTv} />
          </section>
        )}
        {trendsMovie.length > 0 && (
          <section className="block block-movie">
            <h3>
              <IconFilm /> Movie
            </h3>
            <Scroller items={trendsMovie} />
          </section>
        )}
        {trendsPerson.length > 0 && (
          <section className="block block-person">
            <h3>
              <IconUser /> Person
            </h3>
            <Scroller items={trendsPerson} />
          </section>
        )}
      </div>
    </main>
  );
}
Dash.defaultProps = {
  scope: "home",
};
