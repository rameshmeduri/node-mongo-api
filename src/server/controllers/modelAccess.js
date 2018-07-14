import Promise from 'bluebird';
import { NOT_FOUND, OK, SERVER_ERROR } from '../constants/responses';
import accessUtil from '../utils/accessUtil';
import genHashedPassword from '../utils/cryptoUtils';

function createObj(Model, req, res) {
  const modelData = (req.body || {});

  if (!modelData.name || modelData.name === '') {
    res.status(NOT_FOUND.status).send(NOT_FOUND.message);
    return Promise.resolve(false);
  }

  return accessUtil.getInstance(Model).create(new Model(modelData))
    .then((created) => {
      res.status(OK.status).json(created);
      return Promise.resolve(true);
    })
    .catch((err) => {
      res.status(SERVER_ERROR.status).send(err instanceof Error ? err.message : err);
      return Promise.resolve(false);
    });
}

function getObj(Model, req, res) {
  const name = (req.params || {}).name;

  if (!name) {
    res.status(NOT_FOUND.status).send(NOT_FOUND.message);
    return Promise.resolve(false);
  }

  return accessUtil.getInstance(Model).find({ name })
    .then((found) => {
      if (!found || found.length <= 0) {
        res.status(NOT_FOUND.status).send(NOT_FOUND.message);
        return Promise.resolve(false);
      }

      res.status(OK.status).json(found[0]);
      return Promise.resolve(true);
    })
    .catch((err) => {
      res.status(SERVER_ERROR.status).send(err);
      return Promise.resolve(false);
    });
}

function listObjs(Model, req, res) {
  return accessUtil.getInstance(Model).find()
    .then((found) => {
      res.status(OK.status).json(found);
      return Promise.resolve(true);
    })
    .catch((err) => {
      res.status(SERVER_ERROR.status).send(err);
      return Promise.resolve(false);
    });
}

function updateObj(Model, req, res) {
  const modelData = (req.body || {});

  if (!modelData.name || modelData.name === '') {
    res.status(NOT_FOUND.status).send(NOT_FOUND.message);
    return Promise.resolve(false);
  }

  return accessUtil.getInstance(Model).update(modelData)
    .then((updated) => {
      if (!updated) {
        res.status(NOT_FOUND.status).send(NOT_FOUND.message);
        return Promise.resolve(false);
      }

      res.status(OK.status).json(updated);
      return Promise.resolve(true);
    })
    .catch((err) => {
      res.status(SERVER_ERROR.status).send(err);
      return Promise.resolve(false);
    });
}

function deleteObj(Model, req, res) {
  const name = (req.params || {}).name;

  if (!name) {
    res.status(NOT_FOUND.status).send(NOT_FOUND.message);
    return Promise.resolve(false);
  }

  return accessUtil.getInstance(Model).remove({ name })
    .then((found) => {
      if (!found) {
        res.status(NOT_FOUND.status).send(NOT_FOUND.message);
        return Promise.resolve(false);
      }

      res.status(OK.status).json(OK.message);
      return Promise.resolve(true);
    })
    .catch((err) => {
      res.status(SERVER_ERROR.status).send(err);
      return Promise.resolve(false);
    });
}

function createUser(Model, req, res) {
  const modelData = (req.body || {});

  const password = genHashedPassword(modelData.password);
  delete modelData.password;
  modelData.salt = password.salt;
  modelData.hash = password.hash;
  return createObj(Model, req, res);
}

function updateUser(Model, req, res) {
  const modelData = (req.body || {});

  const password = genHashedPassword(modelData.password);
  delete modelData.password;
  modelData.salt = password.salt;
  modelData.hash = password.hash;
  return createObj(Model, req, res);
}

export default {
  create: Model => (req, res) => createObj(Model, req, res),
  get: Model => (req, res) => getObj(Model, req, res),
  list: Model => (req, res) => listObjs(Model, req, res),
  update: Model => (req, res) => updateObj(Model, req, res),
  remove: Model => (req, res) => deleteObj(Model, req, res),
  createUser: Model => (req, res) => createUser(Model, req, res),
  updateUser: Model => (req, res) => updateUser(Model, req, res),
};
