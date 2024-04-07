//designates the connection address for mongoose/mongoDB to use
const {connect, connection} = require('mongoose');

const connectionString = 'mongodb://127.0.0.1:27017/social-network-api'

connect(connectionString);

module.exports = connection;