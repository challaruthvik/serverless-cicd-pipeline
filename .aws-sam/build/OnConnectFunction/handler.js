const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.onConnect = async (event) => {
  const connectionId = event.requestContext.connectionId;
  
  try {
    await dynamoDB.put({
      TableName: process.env.TABLE_NAME,
      Item: {
        connectionId: connectionId,
        timestamp: Date.now()
      }
    }).promise();

    return {
      statusCode: 200,
      body: 'Connected successfully.'
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: 'Failed to connect: ' + JSON.stringify(err)
    };
  }
};