import React from "react";
import Home from "./scenes/Home/";
import Page from "./scenes/Page/";
import AllPagesViews from "./scenes/AllPagesViews/";
import ViewsByPageId from "./scenes/ViewsByPageId/";
import ViewsByCountry from "./scenes/ViewsByCountry/";
import ViewsByBrowser from "./scenes/ViewsByBrowser/";
import RateViews from "./scenes/RateViews/";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Container from "react-bootstrap/Container";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const history = createBrowserHistory();

  return (
    <div className="App">
      <Container fluid className="mt-5">
        <Router history={history}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/allPagesViews" component={AllPagesViews} />
            <Route path="/viewsByPageId" component={ViewsByPageId} />
            <Route path="/viewsByCountry" component={ViewsByCountry} />
            <Route path="/viewsByBrowser" component={ViewsByBrowser} />
            <Route path="/rateViews" component={RateViews} />
            <Route path="/page/:id" exact component={Page} />
            <Route path="*" component={Home} />
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default withAuthenticator(App);
