import mongoose from 'mongoose';
// import fs from 'fs';
import config from '../config';
import logger from '../utils/logger';

export default class Connection {
  constructor() {
    const mongoOptions = {
      keepAlive: true,
      reconnectTries: Number.MAX_VALUE,
    };

    // if (process.env.MONGO_SSL_CA_PATH) {
    //   const sslCa = [fs.readFileSync(process.env.MONGO_SSL_CA_PATH)];
    //   Object.assign(mongoOptions, {
    //     useMongoClient: true,
    //     sslValidate: false,
    //     checkServerIdentity: false,
    //     sslCa,
    //   });
    // }
    mongoose.set('debug', true);
    mongoose.Promise = global.Promise;
    mongoose
      .connect(config.mongoUrl, mongoOptions)
      .then(() => logger.info('Successfully connected to MongoDB.'))
      .catch(logger.error);

    this.connected = true;
    this.instance = mongoose;
    return mongoose;
  }

  getConnection() {
    return this.instance;
  }
}
