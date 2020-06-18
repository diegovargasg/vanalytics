import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import APIConfig from "../../APIConfig";
import moment from "moment";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function Page(props) {
  const [activeUsers, setActiveUsers] = useState(0);
  const [rateInfo, setRateInfo] = useState({});
  const [chartData, setChartData] = useState([]);
  const [totalUsersVisits, setTotalUsersVisits] = useState(0);
  const pageId = props.match.params.id;

  useEffect(() => {
    const fetchActiveUsers = async () => {
      const endDate = moment().unix();
      const startDate = moment().subtract(30, "minutes").unix();
      //const startDate = 1585699200;

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
  }, []);

  return (
    <React.Fragment>
      <h1>Page</h1>
      <h2>Active Users last 30min:</h2>
      <span>{activeUsers}</span>
      <h2>Total users last day:</h2>
      <span>{rateInfo.totalUsers}</span>
      <h2>Returning Users:</h2>
      <span>{rateInfo.recurrentUsers}</span>
      <h2>Rate:</h2>
      <span>{rateInfo.rate}</span>
      <h2>Total users visits:</h2>
      <span>{totalUsersVisits}</span>
      <BarChart
        width={900}
        height={300}
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
        <Bar dataKey="visits" fill="#8884d8" />
      </BarChart>
    </React.Fragment>
  );
}

export default Page;
