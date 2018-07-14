import express from 'express';

import { authCtrl, logoutCtrl } from './controllers/auth';
import { restrict } from './services/auth';
import Api from './models/api';
import Consumer from './models/consumer';
import User from './models/user';
import modelCtrl from './controllers/modelAccess';

const router = express.Router();

router.post('/auth', authCtrl);
router.post('/logout', restrict, logoutCtrl);

/* Consumer CRUD */
router.get('/consumers', restrict, modelCtrl.list(Consumer));
router.get('/consumer/:name', restrict, modelCtrl.get(Consumer));
router.post('/consumer', restrict, modelCtrl.create(Consumer));
router.put('/consumer', restrict, modelCtrl.update(Consumer));
router.delete('/consumer/:name', restrict, modelCtrl.remove(Consumer));

/* API CRUD */
router.get('/apis', restrict, modelCtrl.list(Api));
router.get('/api/:name', restrict, modelCtrl.get(Api));
router.post('/api', restrict, modelCtrl.create(Api));
router.put('/api', restrict, modelCtrl.update(Api));
router.delete('/api/:name', restrict, modelCtrl.remove(Api));

/* USER CRUD */
router.post('/user', restrict, modelCtrl.createUser(User));
router.get('/user/:username', restrict, modelCtrl.get(User));
router.get('/users', restrict, modelCtrl.list(User));
router.put('/user', restrict, modelCtrl.updateUser(User));
router.delete('/user/:username', restrict, modelCtrl.remove(User));

export default router;
