const mongoose = require('mongoose');
require('dotenv').config();

const mongoConnection = async () => {
  const connection = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  return connection.connection.db;
};

module.exports = mongoConnection;