import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import APIConfig from "../../APIConfig";
import Form from "react-bootstrap/Form";

function ViewsByCountry(props) {
  const [response, setResponse] = useState("");
  const [country, setCountry] = useState("Brazil");
  const [request, setRequest] = useState("");
  const [totalViews, setTotalViews] = useState(0);

  const handleChange = (event) => {
    setCountry(event.currentTarget.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiConfig = await APIConfig();
        const apiName = apiConfig.name;
        const path = `/pages/country/${country}`;
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
  }, [country]);

  return (
    <React.Fragment>
      <h2 className="mb-5">Views for country {country}</h2>
      <Form.Group className="mb-5">
        <Form.Label>
          <h4>Try another Country:</h4>
        </Form.Label>
        <Form.Control as="select" onChange={handleChange}>
          <option>Brazil</option>
          <option>Japan</option>
          <option>Germany</option>
          <option>Spain</option>
          <option>Netherlands</option>
          <option>Qatar</option>
          <option>Canada</option>
          <option>Austria</option>
          <option>Sweden</option>
          <option>Argentina</option>
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

export default ViewsByCountry;
