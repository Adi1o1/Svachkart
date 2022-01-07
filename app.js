//Work in progress: Starting server with a new stracture approch of Lodaers. 

const loaders = require('./loaders/index.js');
const express = require('express');

async function startServer() {

  const app = express();

  await loaders({ expressApp: app });

  app.listen(process.env.PORT, err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Your server is ready on port:${process.env.PORT} !`);
  });
}

startServer();
