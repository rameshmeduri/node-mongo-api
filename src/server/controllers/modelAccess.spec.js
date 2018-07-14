/* eslint-disable no-undef */
/* eslint-disable no-extraneous-dependencies */
import { expect } from 'chai';
import sinon from 'sinon';
import modelAccess from './modelAccess';
import accessUtil from '../utils/accessUtil';
import Promise from 'bluebird';

const Model = () => {};

describe('Model Operation', () => {

  describe('#CREATE', () => {
    before(() => {
      sinon.stub(accessUtil, 'getInstance')
        .onFirstCall().returns({
          create: sinon.stub().returns(Promise.reject(new Error('Server error')))
        })
        .onSecondCall().returns({
          create: sinon.stub().returns(Promise.reject('Cannot save data'))
        })
        .onThirdCall().returns({
          create: sinon.stub().returns(Promise.resolve({ foo: 'bar' }))
        });
    });

    after(() => {
      accessUtil.getInstance.restore();
    });

    it('should response with error if no name was given', (done) => {
      const send = sinon.spy();
      const status = sinon.stub().returns({ send });

      modelAccess.create(Model)({ }, { status })
        .then((success) => {
          expect(success).to.be.false;
          expect(send.calledWith('NOT_FOUND')).to.be.true;
          done();
        });
    });

    it('should response with error if server has issues', (done) => {
      const send = sinon.spy();
      const status = sinon.stub().returns({ send });

      modelAccess.create(Model)({ body: { name: 'Tester' } }, { status })
        .then((success) => {
          expect(success).to.be.false;
          expect(send.calledWith('Server error')).to.be.true;
          done();
        });
    });

    it('should response with error if failed to save the object', (done) => {
      const send = sinon.spy();
      const status = sinon.stub().returns({ send });

      modelAccess.create(Model)({ body: { name: 'Tester' } }, { status })
        .then((success) => {
          expect(success).to.be.false;
          expect(send.calledWith('Cannot save data')).to.be.true;
          done();
        });
    });

    it('should response with the created object in JSON format', (done) => {
      const json = sinon.spy();
      const status = sinon.stub().returns({ json });

      modelAccess.create(Model)({ body: { name: 'Tester' } }, { status })
        .then((success) => {
          expect(success).to.be.true;
          expect(json.calledWith({ foo: 'bar' })).to.be.true;
          done();
        });
    });
  });

  describe('#GET', () => {
    before(() => {
      sinon.stub(accessUtil, 'getInstance')
        .onFirstCall().returns({
          find: sinon.stub().returns(Promise.reject('Database issue'))
        })
        .onSecondCall().returns({
          find: sinon.stub().returns(Promise.resolve(null))
        })
        .onThirdCall().returns({
          find: sinon.stub().returns(Promise.resolve([{ foo: 'bar' }]))
        });
    });

    after(() => {
      accessUtil.getInstance.restore();
    });

    it('should response with error if no name was given', (done) => {
      const send = sinon.spy();
      const status = sinon.stub().returns({ send });

      modelAccess.get(Model)({ }, { status })
        .then((success) => {
          expect(success).to.be.false;
          expect(send.calledWith('NOT_FOUND')).to.be.true;
          done();
        });
    });

    it('should response with error if failed to search the object', (done) => {
      const send = sinon.spy();
      const status = sinon.stub().returns({ send });

      modelAccess.get(Model)({ params: { name: 'foo' } }, { status })
        .then((success) => {
          expect(success).to.be.false;
          expect(send.calledWith('Database issue')).to.be.true;
          done();
        });
    });

    it('should response with error if nothing was found', (done) => {
      const send = sinon.spy();
      const status = sinon.stub().returns({ send });

      modelAccess.get(Model)({ params: { name: 'foo' } }, { status })
        .then((success) => {
          expect(success).to.be.false;
          expect(send.calledWith('NOT_FOUND')).to.be.true;
          done();
        });
    });

    it('should response with the found object in JSON format', (done) => {
      const json = sinon.spy();
      const status = sinon.stub().returns({ json });

      modelAccess.get(Model)({ params: { name: 'Tester' } }, { status })
        .then((success) => {
          expect(success).to.be.true;
          expect(json.calledWith({ foo: 'bar' })).to.be.true;
          done();
        });
    });
  });

  describe('#LIST', () => {
    before(() => {
      sinon.stub(accessUtil, 'getInstance')
        .onFirstCall().returns({
          find: sinon.stub().returns(Promise.reject('Database issue'))
        })
        .onSecondCall().returns({
          find: sinon.stub().returns(Promise.resolve([1, 2, 3]))
        });
    });

    after(() => {
      accessUtil.getInstance.restore();
    });

    it('should response with error when database has issues', (done) => {
      const send = sinon.spy();
      const status = sinon.stub().returns({ send });

      modelAccess.list(Model)({ }, { status })
        .then((success) => {
          expect(success).to.be.false;
          expect(send.calledWith('Database issue')).to.be.true;
          done();
        });
    });

    it('should response with the found objects in JSON format', (done) => {
      const json = sinon.spy();
      const status = sinon.stub().returns({ json });

      modelAccess.list(Model)({ params: { name: 'foo' } }, { status })
        .then((success) => {
          expect(success).to.be.true;
          expect(json.calledWith([1, 2, 3])).to.be.true;
          done();
        });
    });
  });

  describe('#UPDATE', () => {
    before(() => {
      sinon.stub(accessUtil, 'getInstance')
        .onFirstCall().returns({
          update: sinon.stub().returns(Promise.reject('Database issue'))
        })
        .onSecondCall().returns({
          update: sinon.stub().returns(Promise.resolve(null))
        })
        .onThirdCall().returns({
          update: sinon.stub().returns(Promise.resolve({ foo: 'bar', updated: true }))
        });
    });

    after(() => {
      accessUtil.getInstance.restore();
    });

    it('should response with error if no name was given', (done) => {
      const send = sinon.spy();
      const status = sinon.stub().returns({ send });

      modelAccess.update(Model)({ }, { status })
        .then((success) => {
          expect(success).to.be.false;
          expect(send.calledWith('NOT_FOUND')).to.be.true;
          done();
        });
    });

    it('should response with error when database has issues', (done) => {
      const send = sinon.spy();
      const status = sinon.stub().returns({ send });

      modelAccess.update(Model)({ body: { name: 'foo' } }, { status })
        .then((success) => {
          expect(success).to.be.false;
          expect(send.calledWith('Database issue')).to.be.true;
          done();
        });
    });

    it('should response with error if no model with the given name', (done) => {
      const send = sinon.spy();
      const status = sinon.stub().returns({ send });

      modelAccess.update(Model)({ body: { name: 'invalid' } }, { status })
        .then((success) => {
          expect(success).to.be.false;
          expect(send.calledWith('NOT_FOUND')).to.be.true;
          done();
        });
    });

    it('should response with the updated objects in JSON format', (done) => {
      const json = sinon.spy();
      const status = sinon.stub().returns({ json });

      modelAccess.update(Model)({ body: { name: 'foo', foo: 'bar' } }, { status })
        .then((success) => {
          expect(success).to.be.true;
          expect(json.calledWith({ foo: 'bar', updated: true })).to.be.true;
          done();
        });
    });
  });


  describe('#REMOVE', () => {
    before(() => {
      sinon.stub(accessUtil, 'getInstance')
        .onFirstCall().returns({
          remove: sinon.stub().returns(Promise.reject('Database issue'))
        })
        .onSecondCall().returns({
          remove: sinon.stub().returns(Promise.resolve(null))
        })
        .onThirdCall().returns({
          remove: sinon.stub().returns(Promise.resolve({ foo: 'bar' }))
        });
    });

    after(() => {
      accessUtil.getInstance.restore();
    });

    it('should response with error if no name was given', (done) => {
      const send = sinon.spy();
      const status = sinon.stub().returns({ send });

      modelAccess.remove(Model)({ }, { status })
        .then((success) => {
          expect(success).to.be.false;
          expect(send.calledWith('NOT_FOUND')).to.be.true;
          done();
        });
    });

    it('should response with error when database has issues', (done) => {
      const send = sinon.spy();
      const status = sinon.stub().returns({ send });

      modelAccess.remove(Model)({ params: { name: 'foo' } }, { status })
        .then((success) => {
          expect(success).to.be.false;
          expect(send.calledWith('Database issue')).to.be.true;
          done();
        });
    });

    it('should response with error if no model with the given name', (done) => {
      const send = sinon.spy();
      const status = sinon.stub().returns({ send });

      modelAccess.remove(Model)({ params: { name: 'invalid' } }, { status })
        .then((success) => {
          expect(success).to.be.false;
          expect(send.calledWith('NOT_FOUND')).to.be.true;
          done();
        });
    });

    it('should response with the updated objects in JSON format', (done) => {
      const json = sinon.spy();
      const status = sinon.stub().returns({ json });

      modelAccess.remove(Model)({ params: { name: 'foo' } }, { status })
        .then((success) => {
          expect(success).to.be.true;
          expect(json.calledWith('OK')).to.be.true;
          done();
        });
    });
  });

});
