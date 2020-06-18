import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import APIConfig from "../../APIConfig";
import moment from "moment";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";

function Page(props) {
  const [activeUsers, setActiveUsers] = useState(0);
  const [rateInfo, setRateInfo] = useState({});
  const [chartData, setChartData] = useState([]);
  const [totalUsersVisits, setTotalUsersVisits] = useState(0);
  const [pageId, setPageId] = useState(0);

  useEffect(() => {
    setPageId(props.match.params.id);
  }, []);

  useEffect(() => {
    const fetchActiveUsers = async () => {
      const endDate = moment().unix();
      const startDate = moment().subtract(30, "minutes").unix();

      try {
        const apiConfig = await APIConfig();

        const path = `/page/${pageId}`;
        const reqParams = {
          headers: apiConfig.headers,
          queryStringParameters: {
            startDate: startDate,
            endDate: endDate,
          },
          response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
        };

        const response = await API.get(apiConfig.name, path, reqParams);
        setActiveUsers(response.Count);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchReturningUsers = async () => {
      const endDate = moment().unix();
      const startDate = moment().subtract(1, "d").unix();
      try {
        const apiConfig = await APIConfig();

        const path = `/page/${pageId}/rates`;
        const reqParams = {
          headers: apiConfig.headers,
          queryStringParameters: {
            startDate: startDate,
            endDate: endDate,
          },
          response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
        };

        const response = await API.get(apiConfig.name, path, reqParams);
        setRateInfo(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchPageViewByCountries = async () => {
      try {
        const apiConfig = await APIConfig();

        const path = `/page/${pageId}`;
        const reqParams = {
          headers: apiConfig.headers,
          response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
        };

        const response = await API.get(apiConfig.name, path, reqParams);
        setTotalUsersVisits(response.Count);

        const countriesCount = {};
        response.Items.forEach((view) => {
          if (countriesCount.hasOwnProperty(view.country)) {
            countriesCount[view.country] = countriesCount[view.country] + 1;
          } else {
            countriesCount[view.country] = 1;
          }
        });

        //Format the data for the charts library
        const data = [];
        for (let [country, count] of Object.entries(countriesCount)) {
          data.push({ country: country, visits: count });
        }
        setChartData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchActiveUsers();
    fetchReturningUsers();
    fetchPageViewByCountries();
  }, [pageId]);

  return (
    <React.Fragment>
      <h2>Page ID: {pageId}</h2>
      <CardDeck className="mt-5 mb-5">
        <Card>
          <Card.Body>
            <Card.Title>Active Users last 30min</Card.Title>
          </Card.Body>
          <Card.Footer className="text-center">{activeUsers}</Card.Footer>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Total users in the last day</Card.Title>
          </Card.Body>
          <Card.Footer className="text-center">
            {rateInfo.totalUsers}
          </Card.Footer>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Returning Users</Card.Title>
          </Card.Body>
          <Card.Footer className="text-center">
            {rateInfo.recurrentUsers}
          </Card.Footer>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Returning Users rate</Card.Title>
          </Card.Body>
          <Card.Footer className="text-center">{rateInfo.rate}</Card.Footer>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Total visits</Card.Title>
          </Card.Body>
          <Card.Footer className="text-center">{totalUsersVisits}</Card.Footer>
        </Card>
      </CardDeck>
      <h2 className="mt-5 mb-5">Total users by country</h2>
      <ResponsiveContainer height={300} width="95%">
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="country" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="visits" fill="#004085" />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

export default Page;
