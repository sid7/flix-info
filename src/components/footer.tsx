import { A } from "./utils";
import { useRouteMatch } from "react-router-dom";

export default function Footer() {
  const is404 = useRouteMatch({
    path: ["/404", "/settings"]
  });
  return (
    <footer hidden={is404?.isExact}>
      <A className="btn btn-text" href="https://www.themoviedb.org">
        The Movie DataBase
      </A>
    </footer>
  );
}
