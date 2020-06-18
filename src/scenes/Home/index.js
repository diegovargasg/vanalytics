import React from "react";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";

function Home(props) {
  return (
    <React.Fragment>
      <h2>Frontend</h2>
      <ListGroup>
        <ListGroup.Item action>
          <Link to="/page/1">Page one</Link>
        </ListGroup.Item>
        <ListGroup.Item action>
          <Link to="/page/2">Page two</Link>
        </ListGroup.Item>
        <ListGroup.Item action>
          <Link to="/page/3">Page three</Link>
        </ListGroup.Item>
        <ListGroup.Item action>
          <Link to="/page/4">Page four</Link>
        </ListGroup.Item>
        <ListGroup.Item action>
          <Link to="/page/5">Page five</Link>
        </ListGroup.Item>
      </ListGroup>
      <h2 className="mt-5">API Tester</h2>
      <ListGroup>
        <ListGroup.Item action>
          <Link to="/allPagesViews">All pages views</Link>
        </ListGroup.Item>
        <ListGroup.Item action>
          <Link to="/viewsByPageId">Views by pageId</Link>
        </ListGroup.Item>
        <ListGroup.Item action>
          <Link to="/viewsByCountry">Views by country</Link>
        </ListGroup.Item>
        <ListGroup.Item action>
          <Link to="/viewsByBrowser">Views by browser</Link>
        </ListGroup.Item>
        <ListGroup.Item action>
          <Link to="/rateViews">Rate Views</Link>
        </ListGroup.Item>
      </ListGroup>
    </React.Fragment>
  );
}

export default Home;
