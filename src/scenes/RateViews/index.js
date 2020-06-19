import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import APIConfig from "../../APIConfig";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import moment from "moment";
import _ from "lodash";

function RateViews(props) {
  const [response, setResponse] = useState("");
  const [request, setRequest] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleChangeStartDate = (event) => {
    const unixTime = moment(event.currentTarget.value).unix();
    setStartDate(unixTime);
  };

  const handleChangeEndDate = (event) => {
    const unixTime = moment(event.currentTarget.value).unix();
    setEndDate(unixTime);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiConfig = await APIConfig();
        const apiName = apiConfig.name;
        const path = `/pages/rates`;
        const reqParams = {
          headers: apiConfig.headers,
          response: false,
        };

        if (startDate) {
          _.set(reqParams, "queryStringParameters.startDate", startDate);
        }

        if (endDate) {
          _.set(reqParams, "queryStringParameters.endDate", endDate);
        }

        const response = await API.get(apiName, path, reqParams);
        console.log("%c API Response", "font-size: 16px; color: #f09030;");
        console.log(response);
        setResponse(JSON.stringify(response, null, 2));
        setRequest(
          `${apiConfig.endpoint}${path}?startDate=${startDate}&endDate=${endDate}`
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [startDate, endDate]);

  return (
    <React.Fragment>
      <h2 className="mb-5">Rate total views</h2>
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>start date</Form.Label>
            <Form.Control type="date" onChange={handleChangeStartDate} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>end date</Form.Label>
            <Form.Control type="date" onChange={handleChangeEndDate} />
          </Form.Group>
        </Form.Row>
      </Form>
      <small className="text-muted">
        *The sample data goes from 01/03/2020 to 31/07/2020
      </small>
      <h4 className="mt-5">Request:</h4>
      <code>{request}</code>
      <h4 className="mt-5">Result:</h4>
      <pre>{response}</pre>
    </React.Fragment>
  );
}

export default RateViews;
