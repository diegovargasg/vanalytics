import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import APIConfig from "../../APIConfig";

function AllPagesViews(props) {
  const [response, setResponse] = useState("");
  const [request, setRequest] = useState("");
  const [totalViews, setTotalViews] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiConfig = await APIConfig();
        const apiName = apiConfig.name;
        const path = "/pages";
        const reqParams = {
          headers: apiConfig.headers,
          response: false,
        };

        const response = await API.get(apiName, path, reqParams);
        setResponse(JSON.stringify(response.Items, null, 2));
        setRequest(`${apiConfig.endpoint}${path}`);
        setTotalViews(response.Count);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <h2 className="mb-5">All Views</h2>
      <h4 className="mb-5">Total views: {totalViews}</h4>
      <h4>Request:</h4>
      <code>{request}</code>
      <h4 className="mt-5">Result:</h4>
      <pre>{response}</pre>
    </React.Fragment>
  );
}

export default AllPagesViews;
