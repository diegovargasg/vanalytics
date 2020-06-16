import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Amplify, { API } from "aws-amplify";
import * as serviceWorker from "./serviceWorker";
import awsExports from "./aws-exports";

/*Amplify.configure({
  API: {
    endpoints: [
      {
        name: "players",
        endpoint:
          "https://b5l0f7pdee.execute-api.eu-central-1.amazonaws.com/prod",
      },
    ],
  },
});*/

Amplify.configure(awsExports);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
