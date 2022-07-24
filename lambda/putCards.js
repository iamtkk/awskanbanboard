var AWS = require("aws-sdk");
var documentClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
});

const tableName = "Cards";

exports.handler = async (event) => {
  console.log("Received: " + JSON.stringify(event, null, 2));

  let response = "";
  try {
    const id = event.pathParameters.id;
    const body = JSON.parse(event.body);
    var params = {
      TableName: tableName,
      Key: { id: id },
      UpdateExpression: "set #c = :c, #t = :t",
      ExpressionAttributeNames: { "#c": "category", "#t": "title" },
      ExpressionAttributeValues: {
        ":c": body.category,
        ":t": body.title,
      },
    };
    await documentClient.update(params).promise();

    response = {
      statusCode: 200,
    };
  } catch (e) {
    console.log(e);
    response = {
      statusCode: 500,
      body: JSON.stringify({ "Message: ": e }),
    };
  }
  return response;
};
