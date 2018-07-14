import logger from '../utils/logger';
import {
  NOT_FOUND,
  SERVER_ERROR,
} from '../constants/responses';

function throw404(req, res) {
  return res.status(NOT_FOUND.status)
    .json(NOT_FOUND.message);
}

function throw500(err, req, res, next) {
  logger.debug('-- server error --', err);

  res.status(SERVER_ERROR.status)
    .json(SERVER_ERROR.message);

  return next();
}

export default {
  throw404,
  throw500,
};
