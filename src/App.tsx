import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Footer from "./components/footer";
import NavBar from "./components/navbar";
import PWAToast from "./components/pwa-toast";
import SchBar from "./components/sch-bar";
import { Portal } from "./components/utils";
import Validate from "./components/validate";
import { Dash, InfoTv, InfoMovie, InfoPerson, Err } from "./pages";

export default function App() {
  return (
    <Router>
      <NavBar />
      <header id="top-header">
        <SchBar />
      </header>
      <Switch>
        <Route path="/" exact>
          <Dash />
        </Route>
        <Route
          path="/:scope(tv|movie|person)"
          exact
          render={(props) => <Dash scope={props.match.params.scope} />}
        />
        <Route
          path="/tv/:id"
          render={(props) => (
            <Validate
              scope="tv"
              id={props.match.params.id}
              component={InfoTv}
            />
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
        <Route
          path="/:err(404|error|offline)"
          render={({ match }) => <Err label={match.params.err as any} />}
        />
        <Redirect to="/404" />
      </Switch>
      <Footer />
      <Portal target="toaster">
        <PWAToast />
      </Portal>
    </Router>
  );
}
