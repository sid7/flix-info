import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { search } from "../scripts/tmdb-helper";

interface IResult {
  name: string;
  id: number;
  img: string | null;
  stamp?: string;
  type: "tv" | "movie" | "person";
}

export default function SchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<IResult[]>([]);
  const [msg, setMsg] = useState<string | null>(null);

  const handels = {
    submit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      search(query).then((payload) => {
        if (payload.data) {
          setResults(payload.data);
          payload.data.length === 0 && setMsg("No Result found");
        } else {
          setResults([]);
          setMsg("Error");
          console.log(payload);
        }
      });
    },
    reset(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      setQuery("");
      setResults([]);
      setMsg(null);
    },
    cls() {
      setQuery("");
      setResults([]);
      setMsg(null);
    },
    updateQuery(e: ChangeEvent<HTMLInputElement>) {
      setQuery(e.target.value);
      if (e.target.value === "") {
        setResults([]);
      }
    }
  };

  return (
    <form className="sch" onSubmit={handels.submit} onReset={handels.reset}>
      <div className="sch-bar">
        <input
          type="text"
          inputMode="search"
          placeholder="Quick Search"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          value={query}
          onChange={handels.updateQuery}
        />
        <button type="reset" className="x">
          &times;
        </button>
      </div>
      <div className="sch-board">
        {msg && <p>{msg}</p>}
        {results.map((r) => (
          <Link
            className={`sch-result type-${r.type}`}
            to={`/${r.type}/${r.id}`}
            onClick={handels.cls}
            key={r.id}>
            <img src={r.img!} alt="" />{" "}
            <span>
              {r.name} <br />
              <small>{r.stamp?.split("-")[0]}</small>
            </span>{" "}
            <span className="type">{r.type}</span>
          </Link>
        ))}
      </div>
    </form>
  );
}
