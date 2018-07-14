import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import connectMongo from 'connect-mongo';
import session from 'express-session';
import path from 'path';

import config from './config';
import logger from './utils/logger';
import addAccessUser from './utils/addAccessUser';
import routes from './routes';
import Db from './services/db';

logger.info('Environment: ', config.currEnv);

const db = new Db();
addAccessUser(config.admin_user, config.admin_password, 'admin') // Add admin user
.then((completed) => {
  if (completed) logger.info('Successfully created Admin Account');
})
.catch(() => {
  logger.warn('Admin account could not be created');
});

const app = express();
app.server = http.createServer(app);

const MongoStore = connectMongo(session);
app.use(session({
  secret: 'very_secret_catnip',
  name: 'access_session',
  saveUninitialized: false, // don't create session until something stored
  resave: true,
  cookie: {
    // secure: true // Apply only when running HTTPS
    maxAge: 3600000,
  }, // = 1 hour.
  store: new MongoStore({
    mongooseConnection: db.connection,
    ttl: 1 * 1 * 60 * 60, // = 1 hour.
  }),
}));

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('tiny', {
  stream: {
    write: message => logger.info(message.trim()),
  },
}));

// set static apis
app.use(express.static(path.join(__dirname, 'public')));

// Set api routes
app.use('/api/v1/', routes);

// serve react app on all other routes
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next({
    message: 'Not Found',
    status: 404,
  });
});

app.use((err, req, res, next) => {
  logger.error(err);
  const error = {
    status: err.status || 500,
    message: err.message || 'Server Error',
  };
  res.status(err.status).json(error);
});

const listener = app.server.listen(config.port, () => {
  logger.info(`Started on port ${listener.address().port}`);
});
