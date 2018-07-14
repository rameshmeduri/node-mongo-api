import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const apiPluginSchema = new Schema({
  auth: { // allowed auth types
    type: [String],
    enum: ['jwt', 'basic_auth', 'key_auth'],
    default: 'jwt',
  },
  aclGroup: {
    type: String,
  },
  ipRestriction: {
    whitelist: {
      type: [String],
      default: '',
    },
    blacklist: {
      type: [String],
      default: '255.255.255.255',
    },
  },
  rateLimit: {
    second: {
      type: Number,
      default: 1000000000,
    },
    minute: Number,
    hour: Number,
    day: Number,
    month: Number,
    year: Number,
    limit_by: {
      type: String,
      enum: ['consumer', 'credential', 'ip'],
      default: 'ip',
    },
  },
});

export default apiPluginSchema;
