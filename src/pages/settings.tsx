import { shades } from "../hooks/accent";
import type { IAccentShade } from "../hooks/accent";

import { tmdb_api_base, tmdb_apis, setApiBase } from "../scripts/tmdb-helper";

interface ISettings {
  currentAccent: IAccentShade;
  setAccent: (shade: IAccentShade) => void;
}

export default function Settings(props: ISettings) {
  return (
    <main className="page page-settings">
      <h1>Settings</h1>
      <section>
        <h2>Accent Color</h2>
        <select
          value={props.currentAccent}
          aria-label="Shades"
          onChange={(e) => {
            props.setAccent(e.target.value as IAccentShade);
          }}
        >
          {shades.map((shade) => (
            <option value={shade} key={shade}>
              {shade}
            </option>
          ))}
        </select>
      </section>
      <section>
        <h2>API Base</h2>
        {tmdb_apis.map((a) => (
          <label
            style={{
              display: "block",
              padding: "4px 15px",
              color: tmdb_api_base === a ? "var(--accent-clr)" : undefined,
            }}
            key={a}
          >
            <input
              type="radio"
              name="apiBase"
              value={a}
              defaultChecked={tmdb_api_base === a}
              onChange={(e) => setApiBase(e.target.value)}
            />
            {a}
          </label>
        ))}
      </section>
    </main>
  );
}
