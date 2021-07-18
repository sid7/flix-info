import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import Footer from "./components/footer";
import NavBar from "./components/navbar";
import SchBar from "./components/sch-bar";
import Validate from "./components/validate";
import { Home, InfoTv, InfoMovie, InfoPerson, Page404 } from "./pages";

export default function App() {
  return (
    <Router>
      <NavBar />
      <header id="top-header">
        <SchBar />
      </header>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route
          path="/:scope(tv|movie|person)"
          exact
          render={(props) => <Home scope={props.match.params.scope} />}
        />
        <Route
          path="/tv/:id"
          render={(props) => (
            <Validate scope="tv" id={props.match.params.id} component={InfoTv} />
          )}
        />
        <Route
          path="/movie/:id"
          render={(props) => (
            <Validate
              scope="movie"
              id={props.match.params.id}
              component={InfoMovie}
            />
          )}
        />
        <Route
          path="/person/:id"
          render={(props) => (
            <Validate
              scope="person"
              id={props.match.params.id}
              component={InfoPerson}
            />
          )}
        />
        <Route path="/404" component={Page404} />
        <Redirect to="/404" />
      </Switch>
      <Footer />
    </Router>
  );
}
