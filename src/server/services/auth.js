import genHashedPassword from '../utils/cryptoUtils';
import logger from '../utils/logger';
import userModel from '../models/user';

export function restrict(req, res, next) {
  const session = req.session;
  if (session.user) {
    next();
  } else {
    logger.error('Access denied!');
    res.sendStatus(401);
  }
}

export function auth(username, password) {
  logger.info(`Authenticating User "${username}"`);

  return userModel.findOne({ username }).exec()
  .then((res) => {
    if (!res || !res._doc) { // eslint-disable-line
      logger.error(`Wrong Username ${username}`);
      throw new Error('Wrong Username');
    } else {
      const user = (res._doc) ? res._doc : false; // eslint-disable-line
      if (user) {
        logger.info('Verifying password...');
        const hashedPass = genHashedPassword(password, user.salt);
        if (hashedPass.hash === user.hash) {
          logger.info('Authentication Successful');
          return user;
        }
      }

      logger.error('Wrong Password');
      throw new Error('Wrong Password');
    }
  })
  .catch((err) => {
    logger.error(`Authentication failed for username "${username}" :`, err);
    throw new Error(err.message || 'Authentication failed');
  });
}

