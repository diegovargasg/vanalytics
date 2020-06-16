"use strinct";

const AWS = require("aws-sdk");

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  const { pageId } = event.pathParameters;
  if (event.queryStringParameters != null) {
    var { startDate, endDate } = event.queryStringParameters;
  }

  let responseBody = "";
  let statusCode = 0;

  const params = {
    TableName: "views",
  };

  if (startDate != null && endDate != null) {
    params["FilterExpression"] =
      "page_id = :pageId AND #date BETWEEN :startDate AND :endDate";

    params["ExpressionAttributeValues"] = {
      ":pageId": pageId,
      ":startDate": startDate,
      ":endDate": endDate,
    };

    params["ExpressionAttributeNames"] = {
      "#date": "date",
    };
  } else {
    params["FilterExpression"] = "page_id = :pageId";
    params["ExpressionAttributeValues"] = {
      ":pageId": pageId,
    };
  }

  try {
    const data = await documentClient.scan(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 200;
  } catch (error) {
    responseBody = `unable to get player ${error}`;
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
