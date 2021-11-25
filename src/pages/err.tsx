import { Link, useHistory } from "react-router-dom";
import { IconArrowLeft, IconHome } from "../components/icons";
interface IErr {
  code?: number;
  title: string;
  subTitle?: string;
}
const errs: { [k in "offline" | "error" | 404]: IErr } = {
  404: {
    code: 404,
    title: "Page Not Found",
    subTitle: "This page does not exist or may have been removed.",
  },
  offline: {
    title: "Your Are Offline",
    subTitle: "You might not have a proper connection, Try again later.",
  },
  error: {
    title: "Error!",
    subTitle: "Something unexpected occurred",
  },
};

export default function Err({ label }: { label: keyof typeof errs }) {
  const err = errs[label as keyof typeof errs];
  const history = useHistory();
  return (
    <main className={`page page-err err-${label}`}>
      <h1>
        {err.code && <code>{err.code}</code>} {err.title}
      </h1>
      {err.subTitle && <h2>{err.subTitle}</h2>}
      {label !== "offline" && (
        <div className="lane">
          <a
            className="btn btn-shine"
            href="#"
            style={{ fontSize: "1.5em" }}
            onClick={(e) => {
              e.preventDefault();
              history.goBack();
            }}
          >
            <IconArrowLeft height="1em" width="1.25em" /> Go to Previous Page
          </a>
          <Link className="btn btn-shine" to="/" style={{ fontSize: "1.5em" }}>
            <IconHome height="1em" width="1.25em" /> Go to Home
          </Link>
        </div>
      )}
    </main>
  );
}
