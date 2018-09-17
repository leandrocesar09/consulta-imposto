const ApiBuilder = require('claudia-api-builder'),
      AWS = require('aws-sdk');

var api = new ApiBuilder(),
    dynamoDb = new AWS.DynamoDB.DocumentClient();

api.post('/icms', function (request) {
    var params = {
        TableName: 'icms',
        Item: {
            icmsid: request.body.origem + request.body.destino,
            valor: request.body.valor
        }
    }
    return dynamoDb.put(params).promise();
}, {success: 201});


api.get('/icms', function (request) {
    return dynamoDb.scan({TableName: 'icms'}).promise()
            .then(response => response.Items
    )
});

api.get('/versao', function (request) {
    return '0.0.2';
});

module.exports = api;
