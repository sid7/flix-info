import { Link, RouteChildrenProps } from "react-router-dom";
import { IconArrowLeft, IconHome } from "../components/icons";

export default function Page404({
  location,
}: RouteChildrenProps<{}, { msg?: string }>) {
  const msg =
    location.state?.msg || "This page does not exist or may have been removed.";
  return (
    <main className="page page-404">
      <h1>
        <code>404</code> | Page Not Found
      </h1>
      <p dangerouslySetInnerHTML={{ __html: msg }} />
      <div className="lane">
        <a
          className="btn btn-shine"
          href="#"
          style={{ fontSize: "1.5em" }}
          onClick={(e) => {
            e.preventDefault();
            history.back();
          }}
        >
          <IconArrowLeft height="1em" width="1.25em" /> Go to Previous Page
        </a>
        <Link className="btn btn-shine" to="/" style={{ fontSize: "1.5em" }}>
          <IconHome height="1em" width="1.25em" /> Go to Home
        </Link>
      </div>
    </main>
  );
}
