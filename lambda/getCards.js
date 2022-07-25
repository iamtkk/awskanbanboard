var AWS = require("aws-sdk");
var documentClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
});

const tableName = "Cards";

exports.handler = async (event) => {
  console.log("Received: " + JSON.stringify(event, null, 2));

  let response = "";
  try {
    var params = {
      TableName: tableName,
    };

    const cards = await documentClient.scan(params).promise();
    // TODO implement
    response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(cards),
    };
  } catch (e) {
    console.log(e);
    response = {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ "Message: ": e }),
    };
  }
  return response;
};
