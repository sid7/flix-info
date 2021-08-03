import { img } from "../../scripts/tmdb-helper";
import { prettyDate } from "../../scripts/utils";
import type { IPersonInfo } from "../../types/person";

export default function InfoPerson(data: IPersonInfo) {
  if (!data.combined_credits) {
    return null;
  }
  const poster = img.profile(data.profile_path, "md");
  const birthday = prettyDate(data.birthday);
  const known_for = data.combined_credits.cast.sort(
    (a, b) => a.vote_average - b.vote_average
  );

  return (
    <main className="page page-info info-person">
      <header className="card-cover">
        <h1>{data.name}</h1>
        <hr />
        {poster && <img className="poster" src={poster} alt="" />}
        <ul>
          <li>
            <b>Known For</b> {data.known_for_department}
          </li>
          <li>
            <b>Known Credits</b> {data.combined_credits.cast.length}
          </li>
          <li>
            <b>Gender</b> {[, "Female", "Male"][data.gender]}
          </li>
          <li>
            <b>Birthday</b> {birthday}
          </li>
          <li style={{ gridColumn: "span 2", marginBlockStart: "auto" }}>
            <b>Place of Birth</b> {data.place_of_birth}
          </li>
          {data.deathday && (
            <li>
              <b>DeathDay</b> {prettyDate(data.deathday)}
            </li>
          )}
        </ul>
      </header>
      <section className="sec sec-desc">
        {data.biography.split("\n\n").map((txt, i) => (
          <p key={i}>{txt}</p>
        ))}
      </section>
    </main>
  );
}
