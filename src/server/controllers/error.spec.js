import chai from 'chai';

import error from './error';

const expect = chai.expect;

describe('Error controller', () => {
  it('should throw 404 error', () => {
    const res = {
      status: function(s) {
        expect(s).to.equal(404);

        return {
          json: function(value) {
            expect(value).to.equal('NOT_FOUND');
          }
        };
      }
    };

    error.throw404({}, res);
  });

  it('should throw 500 error', () => {
    const res = {
      status: function(s) {
        expect(s).to.equal(500);

        return {
          json: function(value) {
            expect(value).to.equal('SERVER_ERROR');
          }
        };
      }
    };
    error.throw500({}, {}, res, () => false);
  });
});
