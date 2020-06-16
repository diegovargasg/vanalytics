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

  try {
    const data = await documentClient.scan(params).promise();
    responseBody = JSON.stringify(data);
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
