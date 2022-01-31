import { NavLink } from "react-router-dom";
import { IconHome, IconTv, IconFilm, IconUser, IconSettings } from "./icons";

export default function NavBar() {
  return (
    <aside className="navbar">
      <a className="link-brand" href="/" aria-label="flix-info">
        <span aria-hidden>🍿</span>
      </a>
      <nav aria-label="pages">
        <NavLink to="/tv" title="TV">
          <IconTv />
        </NavLink>
        <NavLink to="/movie" title="Movie">
          <IconFilm />
        </NavLink>
        <NavLink to="/" title="Home" exact>
          <IconHome />
        </NavLink>
        <NavLink to="/person" title="Person">
          <IconUser />
        </NavLink>
        <NavLink to="/settings" title="Settings">
          <IconSettings />
        </NavLink>
      </nav>
    </aside>
  );
}
