import React from "react";
import Home from "./scenes/Home/";
import Page from "./scenes/Page/";
import AllPagesViews from "./scenes/AllPagesViews/";
import ViewsByPageId from "./scenes/ViewsByPageId/";
import ViewsByCountry from "./scenes/ViewsByCountry/";
import ViewsByBrowser from "./scenes/ViewsByBrowser/";
import RateViews from "./scenes/RateViews/";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";

function App(props) {
  const history = createBrowserHistory();
  const style = { color: "white", cursor: "pointer" };

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
      <Router history={history}>
        <Navbar bg="dark" expand="lg">
          <Navbar.Brand className="col">
            <Link to="/">
              <span style={style}>Vanalitycs</span>
            </Link>
          </Navbar.Brand>
          <div className="col text-right">
            <Button variant="light" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Navbar>
        <Container fluid className="mt-5">
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
        </Container>
      </Router>
    </div>
  );
}

export default withAuthenticator(App);
