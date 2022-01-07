const expressLoader = require('./express.js');
const mongooseLoader = require('./mongoose.js');

console.log('init really starts the index.js');

const loader = async ({ expressApp }) => {
  
  //Loading different require modules
  const mongoConnection = await mongooseLoader();
  console.log('MongoDB Initialized');

  //TODO: If time remains, Apply DI
  
  //TODO: If time remains, Add cron jobs

  await expressLoader({ app: expressApp });
  console.log('Express Initialized');
}

module.exports = loader;