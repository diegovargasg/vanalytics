"use strinct";

const AWS = require("aws-sdk");

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;
  const params = {
    TableName: "views",
  };

  if (event.queryStringParameters != null) {
    var { startDate, endDate } = event.queryStringParameters;
  }

  if (startDate != null && endDate != null) {
    params["FilterExpression"] = "#date BETWEEN :startDate AND :endDate";

    params["ExpressionAttributeValues"] = {
      ":startDate": startDate,
      ":endDate": endDate,
    };

    params["ExpressionAttributeNames"] = {
      "#date": "date",
    };
  }

  try {
    const data = await documentClient.scan(params).promise();

    const uniqueUsers = new Set();
    const uniquePages = new Set();
    let recurrentUsers = 0;
    let totalUsers = 0;
    let rate = 0;

    data.Items.forEach((view) => {
      uniqueUsers.add(view.user_id);
      uniquePages.add(view.page_id);
    });

    totalUsers = uniqueUsers.size;

    uniquePages.forEach((page) => {
      for (let user of uniqueUsers) {
        let cont = 0;
        data.Items.some((view) => {
          if (view.user_id === user && view.page_id === page) {
            cont++;
          }
          //it is a recurring visitor
          if (cont >= 2) {
            recurrentUsers++;
            uniqueUsers.delete(user);
            return true;
          }
        });
      }
    });

    rate = Math.round((recurrentUsers / totalUsers) * 100);

    responseBody = JSON.stringify({
      rate,
      recurrentUsers,
      totalUsers,
    });

    //responseBody = JSON.stringify(data);
    statusCode = 200;
  } catch (error) {
    responseBody = `unable to get views ${error}`;
    statusCode = 403;
  }

  const response = {
    isBase64Encoded: false,
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: responseBody,
  };

  return response;
};
