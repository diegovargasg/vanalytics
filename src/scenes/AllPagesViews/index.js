import React, { useEffect, useState } from "react";
import { API, Auth } from "aws-amplify";

function AllPagesViews(props) {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const apiName = "vAPI";
      const path = "/pages";
      const myInit = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${(await Auth.currentSession())
            .getIdToken()
            .getJwtToken()}`,
        },
        response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
      };

      API.get(apiName, path, myInit)
        .then((response) => {
          console.log(response);
          setResponse(JSON.stringify(response.Items));
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <h2>All Views</h2>
      <h4>Request:</h4>
      <code>
        https://phats8hfgg.execute-api.eu-central-1.amazonaws.com/prod
      </code>
      <h4>Result:</h4>
      <code>{response}</code>
    </React.Fragment>
  );
}

export default AllPagesViews;
