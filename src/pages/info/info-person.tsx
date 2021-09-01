import CreditBlock from "../../components/credit-block";
import { img } from "../../scripts/tmdb-helper";
import { prettyDate } from "../../scripts/utils";
import { processCreditsForTable } from "../../scripts/util-credit-table";
import type { IPersonInfo } from "../../types/person";

const gender = ["—", "Female", "Male"];

export default function InfoPerson(data: IPersonInfo) {
  if (!data.combined_credits) {
    return null;
  }
  const poster = img.profile(data.profile_path, "lg");
  const birthday = prettyDate(data.birthday);
  const bio = data.biography ? data.biography.split("\n\n") : null;
  const credits = processCreditsForTable(
    data.combined_credits,
    data.known_for_department
  );

  return (
    <main className="page page-info info-person">
      <header className="card">
        <h1>{data.name}</h1>
        <hr />
        <div className="card-body">
          {poster && <img src={poster} alt="" />}
          <div className="content">
            <ul className="facts">
              <li>
                <b>Known For</b> {data.known_for_department}
              </li>
              <li>
                <b>Known Credits</b> {data.combined_credits.cast.length}
              </li>
              <li>
                <b>Gender</b> {gender[data.gender]}
              </li>
              <li>
                <b>Birthday</b> {birthday}
              </li>
              <li style={{ gridColumn: "span 2", marginBlockStart: "auto" }}>
                <b>Place of Birth</b> {data.place_of_birth || "—"}
              </li>
              {data.deathday && (
                <li>
                  <b>DeathDay</b> {prettyDate(data.deathday)}
                </li>
              )}
            </ul>
            <hr />
            {bio?.map((txt, i) => (
              <p key={i}>{txt}</p>
            ))}
          </div>
        </div>
      </header>
      <section className="sec sec-credits">
        <h2>Credits —</h2>
        <CreditBlock entry={credits.primary} primary />
        {credits.rest.map((credit) => (
          <CreditBlock key={credit[0]} entry={credit} />
        ))}
      </section>
    </main>
  );
}
