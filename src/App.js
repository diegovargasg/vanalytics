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
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";

function App() {
  const history = createBrowserHistory();
  const style = { color: "white" };

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      window.location.reload(false);
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  return (
    <div className="App">
      <Navbar bg="dark" expand="lg">
        <Navbar.Brand className="col">
          <span style={style}>Vanalytics</span>
        </Navbar.Brand>
        <div className="col text-right">
          <Button variant="light" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Navbar>
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
