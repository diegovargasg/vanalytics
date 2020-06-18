"use strinct";

const AWS = require("aws-sdk");

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;
  const { pageId } = event.pathParameters;

  const params = {
    TableName: "views",
    FilterExpression: "page_id = :pageId",
    ExpressionAttributeValues: {
      ":pageId": pageId,
    },
  };

  if (event.queryStringParameters != null) {
    var { startDate, endDate } = event.queryStringParameters;
  }

  if (startDate != null) {
    params[
      "FilterExpression"
    ] = `${params["FilterExpression"]} AND #date >= :startDate`;

    params["ExpressionAttributeValues"][":startDate"] = startDate;
  }

  if (endDate != null) {
    params[
      "FilterExpression"
    ] = `${params["FilterExpression"]} AND #date <= :endDate`;

    params["ExpressionAttributeValues"][":endDate"] = endDate;
  }

  if (startDate != null || endDate != null) {
    params["ExpressionAttributeNames"] = {
      "#date": "date",
    };
  }

  try {
    const data = await documentClient.scan(params).promise();

    const uniqueUsers = new Set();
    let recurrentUsers = 0;
    let totalUsers = 0;
    let rate = 0;

    data.Items.forEach((view) => {
      uniqueUsers.add(view.user_id);
    });

    totalUsers = uniqueUsers.size;

    for (let user of uniqueUsers) {
      let cont = 0;
      data.Items.some((view) => {
        if (view.user_id === user) {
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

    rate =
      totalUsers === 0
        ? totalUsers
        : Math.round((recurrentUsers / totalUsers) * 100);

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
