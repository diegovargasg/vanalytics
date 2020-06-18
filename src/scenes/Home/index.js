import React from "react";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";

function Home(props) {
  return (
    <React.Fragment>
      <h2>Frontend</h2>
      <ListGroup>
        <Link to="/page/1">
          <ListGroup.Item action>Page one</ListGroup.Item>
        </Link>
        <Link to="/page/2">
          <ListGroup.Item action>Page two</ListGroup.Item>
        </Link>
        <Link to="/page/3">
          <ListGroup.Item action>Page three</ListGroup.Item>
        </Link>
        <Link to="/page/4">
          <ListGroup.Item action>Page four</ListGroup.Item>
        </Link>
        <Link to="/page/5">
          <ListGroup.Item action>Page five</ListGroup.Item>
        </Link>
      </ListGroup>
      <h2 className="mt-5">API Tester</h2>
      <ListGroup>
        <Link to="/allPagesViews">
          <ListGroup.Item action>All pages views</ListGroup.Item>
        </Link>
        <Link to="/viewsByPageId">
          <ListGroup.Item action>Views by pageId</ListGroup.Item>
        </Link>
        <Link to="/viewsByCountry">
          <ListGroup.Item action>Views by country</ListGroup.Item>
        </Link>
        <Link to="/viewsByBrowser">
          <ListGroup.Item action>Views by browser</ListGroup.Item>
        </Link>
        <Link to="/rateViews">
          <ListGroup.Item action>Rate Views</ListGroup.Item>
        </Link>
      </ListGroup>
    </React.Fragment>
  );
}

export default Home;
