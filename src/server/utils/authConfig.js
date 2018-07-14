import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const jwtConfigSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: 'jwt',
  },
  uriParamNames: {
    type: [String],
    default: ['jwt'],
  },
  claimsToVerify: {
    type: [String],
    default: ['exp'],
  },
  keyClaimName: {
    type: String,
    default: 'iss',
  },
});

const basicAuthConfigSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: 'basicAuth',
  },
  hideCredentials: Boolean,
});

const keyAuthConfigSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: 'keyAuth',
  },
  key: String,
  keyNames: {
    type: [String],
    default: ['apiKey'],
  },
  keyInBody: {
    type: Boolean,
    default: true,
  },
  hideCredentials: Boolean,
});

const JwtConfig = mongoose.model('JwtConfig', jwtConfigSchema);
const BasicAuthConfig = mongoose.model('BasicAuthConfig', basicAuthConfigSchema);
const KeyAuthConfig = mongoose.model('KeyAuthConfig', keyAuthConfigSchema);

export default {
  jwt: JwtConfig,
  basicAuth: BasicAuthConfig,
  keyAuth: KeyAuthConfig,
};
