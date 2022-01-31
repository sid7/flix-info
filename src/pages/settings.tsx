import { shades } from "../hooks/accent";
import type { IAccentShade } from "../hooks/accent";

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
    </main>
  );
}
