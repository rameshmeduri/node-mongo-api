import logger from '../utils/logger';
import { auth } from '../services/auth';

export function authCtrl(req, res, next) {
  const session = req.session;
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send('Missing username or password');
    return;
  }

  auth(username, password)
  .then((user) => {
    logger.info('Authentication Successful: Resgistering Session');

    session.user = user;
    session.save((err) => {
      logger.info('Session Created for username: ', username);
      if (!err) res.status(200).json({ success: 'true', user: username });
    });
  })
  .catch((err) => {
    logger.error('POST /auth error', err);
    res.sendStatus(401);
  });
}

export function logoutCtrl(req, res, next) {
  const session = req.session;
  const { user } = req.body;

  if (!user || !session.user) {
    res.sendStatus(401);
    return;
  }

  delete session.user;
  session.save((err) => {
    logger.info(`Logging out the user: ${user}`);
    if (!err) res.status(200).json({ success: 'true' });
  });
}
