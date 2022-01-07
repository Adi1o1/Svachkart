const express = require('express');
const cors = require('cors');

// refence: https://github.com/santiq/bulletproof-nodejs/blob/master/src/loaders/express.ts, Used this code a start point and made my own code.

const expressApp = async ({ app }) => {
  /**
   * Health Check endpoints
   * @TODO Explain why they are here
   */
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Middleware that transforms the raw string of req.body into json
  app.use(express.json());
  app.use(express.urlencoded({
    extended: true
  }));
  
  //TODO: If time remains, Try to make a file with routes and load it.
  // app.use(config.api.prefix, routes());
  
  // Load API routes
  // User route
  const userRouter = require('../api/routes/user.api.js');
  app.use('/user', userRouter);

  const productRouter = require('../api/routes/product.api.js');
  app.use('/product', productRouter);

  
  //TODO: ADD Product route

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  /// error handlers
  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === 'UnauthorizedError') {
      return res
        .status(err.status)
        .send({ message: err.message })
        .end();
    }
    return next(err);
  });
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
}

module.exports = expressApp;