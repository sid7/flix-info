import { A } from "./utils";
import { IconTmdbShot } from "./icons";
import { useRouteMatch } from "react-router-dom";

export default function Footer() {
  const is404 = useRouteMatch({
    path: ["/404", "/settings"],
  });
  return (
    <footer hidden={is404?.isExact}>
      <p>
        All images and information/data is supplied by{" "}
        <A href="https://www.themoviedb.org">
          <IconTmdbShot /> The Movie Database (TMDb)
        </A>
        . Flix Info uses the TMDb API but it is not endorsed or certified by
        TMDb.
      </p>
    </footer>
  );
}
