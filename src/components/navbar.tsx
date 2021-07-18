import { NavLink } from "react-router-dom";
import { Home, Tv, Film, User, Settings } from "react-feather";

export default function NavBar() {
  return (
    <aside className="navbar">
      <a className="link-brand" href="/">
        🍿
      </a>
      <nav>
        <NavLink to="/tv" title="TV">
          <Tv height="1em" width="1.25em" />
        </NavLink>
        <NavLink to="/movie" title="Movie">
          <Film height="1em" width="1.25em" />
        </NavLink>
        <NavLink to="/" title="Home" exact>
          <Home height="1em" width="1.25em" />
        </NavLink>
        <NavLink to="/person" title="Person">
          <User height="1em" width="1.25em" />
        </NavLink>
        <NavLink to="/settings" title="Settings">
          <Settings height="1em" width="1.25em" />
        </NavLink>
      </nav>
    </aside>
  );
}
