import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import APIConfig from "../../APIConfig";
import Form from "react-bootstrap/Form";

function ViewsByBrowser(props) {
  const [response, setResponse] = useState("");
  const [browser, setBrowser] = useState("Sierra");
  const [request, setRequest] = useState("");
  const [totalViews, setTotalViews] = useState(0);

  const handleChange = (event) => {
    setBrowser(event.currentTarget.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiConfig = await APIConfig();
        const apiName = apiConfig.name;
        const path = `/pages/browser/${browser}`;
        const reqParams = {
          headers: apiConfig.headers,
          response: false,
        };

        const response = await API.get(apiName, path, reqParams);
        console.log("%c API Response", "font-size: 16px; color: #f09030;");
        console.log(response);
        setResponse(JSON.stringify(response.Items, null, 2));
        setRequest(`${apiConfig.endpoint}${path}`);
        setTotalViews(response.Count);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [browser]);

  return (
    <React.Fragment>
      <h2 className="mb-5">Views for browser {browser}</h2>
      <Form.Group className="mb-5">
        <Form.Label>
          <h4>Try another browser:</h4>
        </Form.Label>
        <Form.Control as="select" onChange={handleChange}>
          <option>Sierra</option>
          <option>Charlie</option>
          <option>Whiskey</option>
          <option>Zulu</option>
          <option>Oscar</option>
          <option>Alfa</option>
          <option>Romeo</option>
          <option>Kilo</option>
          <option>Uniform</option>
          <option>Yankee</option>
          <option>Quebec</option>
        </Form.Control>
      </Form.Group>
      <h4 className="mb-5">Total views: {totalViews}</h4>
      <h4>Request:</h4>
      <code>{request}</code>
      <h4 className="mt-5">Result:</h4>
      <pre>{response}</pre>
    </React.Fragment>
  );
}

export default ViewsByBrowser;
