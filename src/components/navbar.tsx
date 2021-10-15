import { NavLink } from "react-router-dom";
import { IconHome, IconTv, IconFilm, IconUser, IconSettings } from "./icons";

export default function NavBar() {
  return (
    <aside className="navbar">
      <a className="link-brand" href="/">
        🍿
      </a>
      <nav>
        <NavLink to="/tv" title="TV">
          <IconTv height="1em" width="1.25em" />
        </NavLink>
        <NavLink to="/movie" title="Movie">
          <IconFilm height="1em" width="1.25em" />
        </NavLink>
        <NavLink to="/" title="Home" exact>
          <IconHome height="1em" width="1.25em" />
        </NavLink>
        <NavLink to="/person" title="Person">
          <IconUser height="1em" width="1.25em" />
        </NavLink>
        <NavLink to="/settings" title="Settings">
          <IconSettings height="1em" width="1.25em" />
        </NavLink>
      </nav>
    </aside>
  );
}
