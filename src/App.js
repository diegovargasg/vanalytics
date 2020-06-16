import React, { useEffect } from "react";
import { API, Auth } from "aws-amplify";
import logo from "./logo.svg";
import "./App.css";
import { withAuthenticator } from "@aws-amplify/ui-react";

function App() {
  useEffect(() => {
    const fetchData = async () => {
      const apiName = "players";
      const path = "/players/123";
      const myInit = {
        // OPTIONAL
        headers: {
          "Content-Type": "application/json",
          Authorization: `${(await Auth.currentSession())
            .getIdToken()
            .getJwtToken()}`,
        }, // OPTIONAL
        response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
      };

      API.get(apiName, path, myInit)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
