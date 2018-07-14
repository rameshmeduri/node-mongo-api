import crypto from 'crypto';


const genRandomString = length => (
  crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex') /** convert to hexadecimal format */
    .slice(0, length)
);

const sha512 = (password, salt) => {
  const hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
  hash.update(password);
  const value = hash.digest('hex');
  return {
    passwordHash: value,
  };
};

export default function genHashedPassword(password, salt = genRandomString(16)) {
  const hash = sha512(password, salt);
  return {
    salt,
    hash: hash.passwordHash,
  };
}
