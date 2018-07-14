/* eslint-disable no-undef */
import { expect } from 'chai';
import mongoose from 'mongoose';
import sinon from 'sinon';
import sinonMongoose from 'sinon-mongoose'; // eslint-disable-line no-unused-vars
import accessUtil from './accessUtil';

describe('Access Util', () => {
  let Model = mongoose.model('Model',
    new mongoose.Schema({
      name: {
        type: String
      }
    }));
  let ModelMock = sinon.mock(Model);
  let unit = accessUtil.getInstance(Model);

  describe('#CREATE operation', () => {
    it('Should return a Promise with the same object as returned by mongoose', (done) => {
      unit.create({
          name: 'Test Model',
          save: () => Promise.resolve({ id: 1, name: 'Test Model' })
        })
        .then((res) => {
          expect(res).to.deep.equal({ id: 1, name: 'Test Model' });
          done();
        });
    });

    it('Should return a Promise which is rejected later if mongoose returned an error', (done) => {
      unit.create({
          name: 'Test Model',
          save: () => Promise.reject(new Error('Cannot save'))
        })
        .catch((err) => {
          expect(err).to.be.an('error');
          done();
        });
    });
  });


  describe('#FIND operation', () => {
    before(() => {
      ModelMock
        .expects('find').withArgs({ name: 'Test Model' })
        .returns({
          exec: () => Promise.resolve({ id: 1, name: 'Test Model' })
        });

      ModelMock
        .expects('find').withArgs({ name: 'INVALID' })
        .returns({
          exec: () => Promise.reject(new Error('Not found'))
        });
    });

    after(() => {
      ModelMock.verify();
    });

    it('Should return a Promise with the same object as returned by mongoose', (done) => {
      unit.find({ name: 'Test Model'})
        .then((res) => {
          expect(res).to.deep.equal({ id: 1, name: 'Test Model' });
          done();
        });
    });

    it('Should return a Promise which is rejected later if mongoose returned an error', (done) => {
      unit.find({ name: 'INVALID'})
        .catch((err) => {
          expect(err).to.be.an('error');
          done();
        });
    });
  });

  describe('#UPDATE operation', () => {
    before(() => {
      ModelMock
        .expects('findOneAndUpdate')
        .withArgs({ name: 'Foo' }, { name: 'Foo', value: 'bar' }, { new: true })
        .returns({
          exec: () => Promise.resolve({ id: 2, name: 'Foo', value: 'bar' })
        });

      ModelMock
        .expects('findOneAndUpdate')
        .withArgs({ name: 'INVALID' }, { name: 'INVALID' }, { new: true })
        .returns({
          exec: () => Promise.reject(new Error('Cannot update'))
        });
    });

    after(() => {
      ModelMock.verify();
    });

    it('Should return a Promise with the updated object as returned by mongoose', (done) => {
      unit.update({ name: 'Foo', value: 'bar' })
        .then((res) => {
          expect(res).to.deep.equal({ id: 2, name: 'Foo', value: 'bar' });
          done();
        });
    });

    it('Should return a Promise which is rejected later if mongoose returned an error', (done) => {
      unit.update({ name: 'INVALID'})
        .catch((err) => {
          expect(err).to.be.an('error');
          done();
        });
    });
  });

  describe('#REMOVE operation', () => {
    before(() => {
      ModelMock
        .expects('findOneAndRemove')
        .withArgs({ name: 'Foo' })
        .returns({
          exec: () => Promise.resolve({ id: 2, name: 'Foo', value: 'bar' })
        });

      ModelMock
        .expects('findOneAndRemove')
        .withArgs({ name: 'INVALID' })
        .returns({
          exec: () => Promise.reject(new Error('Invalid query'))
        });
    });

    after(() => {
      ModelMock.verify();
    });

    it('Should return a Promise with the removed object as returned by mongoose', (done) => {
      unit.remove({ name: 'Foo'})
        .then((res) => {
          expect(res).to.deep.equal({ id: 2, name: 'Foo', value: 'bar' });
          done();
        });
    });

    it('Should return a Promise which is rejected later if mongoose returned an error', (done) => {
      unit.remove({ name: 'INVALID'})
        .catch((err) => {
          expect(err).to.be.an('error');
          done();
        });
    });
  });

});
