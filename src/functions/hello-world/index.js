exports.handler = async (event) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Hello from your Serverless CI/CD pipeline!',
            time: new Date().toISOString()
        }),
    };
    return response;
};