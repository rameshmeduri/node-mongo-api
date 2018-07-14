import UserModel from '../models/user';
import genHashedPassword from './cryptoUtils';
import logger from './logger';

const addAccessUser = (username, password, role) => {
  const tuser = {};
  const hashedPass = genHashedPassword(password);

  tuser.username = username;
  tuser.role = role;
  tuser.salt = hashedPass.salt;
  tuser.hash = hashedPass.hash;
  const user = new UserModel(tuser);

  return user.save()
  .then(() => {
    logger.info(`Successful Creation of account: ${username}`);
    return true;
  })
  .catch((err) => {
    logger.error('Error Creating Access Account.');
    throw new Error('Error Creating Access Account.', err);
  });
};

export default addAccessUser;
