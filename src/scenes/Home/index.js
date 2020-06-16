import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Home(props) {
  return (
    <React.Fragment>
      <h2>Frontend</h2>
      <Link to="/page/3">All pages views</Link>
      <h2>API Tester</h2>
      <ul>
        <li>
          <Link to="/allPagesViews">All pages views</Link>
        </li>
        <li>
          <Link to="/viewsByPageId">Views by pageId</Link>
        </li>
        <li>
          <Link to="/viewsByCountry">Views by country</Link>
        </li>
        <li>
          <Link to="/rateViewsByPageId">Views by browser</Link>
        </li>
        <li>
          <Link to="/rateViewsByPageId">Rate Views by pageId</Link>
        </li>
      </ul>
      <span>Views per Browser Name</span>
      <span>Rate returning vs all users in a current period of time</span>
      <span>Page activity for a period given in time</span>
    </React.Fragment>
  );
}

export default Home;
