import { expect } from 'chai';
import request from 'supertest';
import app from '../index';

describe('Index Controller', () => {
  describe('# GET /', () => {
    it('should success', done => {
      request(app)
        .get('/api/')
        .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.status).to.equal(200);
          expect(res.body).to.equal('ok');
          done();
        });
    });
  });
});
