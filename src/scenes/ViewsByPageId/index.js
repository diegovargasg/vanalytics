import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import APIConfig from "../../APIConfig";
import Form from "react-bootstrap/Form";

function ViewsByPageId(props) {
  const [response, setResponse] = useState("");
  const [request, setRequest] = useState("");
  const [pageId, setPageId] = useState(1);
  const [totalViews, setTotalViews] = useState(0);

  const handleChange = (event) => {
    setPageId(event.currentTarget.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiConfig = await APIConfig();
        const apiName = apiConfig.name;
        const path = `/page/${pageId}`;
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
  }, [pageId]);

  return (
    <React.Fragment>
      <h2 className="mb-5">Views for page id: {pageId}</h2>
      <Form.Group className="mb-5">
        <Form.Label>
          <h4>Try another pageId:</h4>
        </Form.Label>
        <Form.Control as="select" onChange={handleChange}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
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

export default ViewsByPageId;
