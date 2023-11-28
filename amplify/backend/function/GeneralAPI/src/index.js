const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app');

/**
 * @type {import('http').Server}
 */
const server = awsServerlessExpress.createServer(app);

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
};


// exports.handler = async function () {
//     var message = "nothing"
//     mongoose.connect("mongodb+srv://root:gmQ3kZT9aKJBQF7W@mernapp.9jdlshy.mongodb.net/?retryWrites=true&w=majority")
//     .then(()=>{
//         message = "mongo up"
//     })
//     .catch((error) => {
//         message = JSON.stringify(error);
//     })
//     return {
//       statusCode: 200,
//       message: message
//     };
//   };