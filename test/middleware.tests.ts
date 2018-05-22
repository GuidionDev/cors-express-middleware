import * as Chai from 'chai';
import {corsMiddleware} from '../src/middleware';
import RequestMock from './mocks/request.mock';
import ResponseMock from './mocks/response.mock';

const expect = Chai.expect;
describe('corsMiddleware', () => {

  it('should return a function', () => {
    expect(corsMiddleware('test')).to.be.a('function');
  });

  describe('returned function', () => {
    it ('Adds the correct settings when using a string with matching origin', () => {
      const returnedFunction = corsMiddleware('test.nl,test.com');
      const request = new RequestMock('test.nl');
      const response = new ResponseMock();
      returnedFunction(request, response, () => {});
      expect(response.headers['Access-Control-Allow-Origin'])
        .to.equal('test.nl');
      expect(response.headers['Access-Control-Allow-Methods'])
        .to.equal('GET, POST, PUT, PATCH, DELETE');
      expect(response.headers['Access-Control-Allow-Headers'])
        .to.equal('Origin, X-Requested-With, Content-Type, Accept, Authorization');
      expect(response.headers['Content-Type'])
        .to.equal('application/json');
    });

    it ('Adds the correct settings when using an array with matching origin', () => {
      const returnedFunction = corsMiddleware(['test.nl', 'test.com']);
      const request = new RequestMock('test.nl');
      const response = new ResponseMock();
      returnedFunction(request, response, () => {});
      expect(response.headers['Access-Control-Allow-Origin'])
        .to.equal('test.nl');
      expect(response.headers['Access-Control-Allow-Methods'])
        .to.equal('GET, POST, PUT, PATCH, DELETE');
      expect(response.headers['Access-Control-Allow-Headers'])
        .to.equal('Origin, X-Requested-With, Content-Type, Accept, Authorization');
      expect(response.headers['Content-Type'])
        .to.equal('application/json');
    });

    it ('Adds the correct settings when using an array without matching origin', () => {
      const returnedFunction = corsMiddleware(['test.nl', 'test.com']);
      const request = new RequestMock('nothere.nl');
      const response = new ResponseMock();
      returnedFunction(request, response, () => {});
      expect(response.headers['Access-Control-Allow-Origin'])
        .to.equal(undefined);
      expect(response.headers['Access-Control-Allow-Methods'])
        .to.equal(undefined);
      expect(response.headers['Access-Control-Allow-Headers'])
        .to.equal(undefined);
      expect(response.headers['Content-Type'])
        .to.equal('application/json');
    });

    it ('Adds the correct settings when using a string without matching origin', () => {
      const returnedFunction = corsMiddleware('test.nl,test.com');
      const request = new RequestMock('nothere.nl');
      const response = new ResponseMock();
      returnedFunction(request, response, () => {});
      expect(response.headers['Access-Control-Allow-Origin'])
        .to.equal(undefined);
      expect(response.headers['Access-Control-Allow-Methods'])
        .to.equal(undefined);
      expect(response.headers['Access-Control-Allow-Headers'])
        .to.equal(undefined);
      expect(response.headers['Content-Type'])
        .to.equal('application/json');
    });

    it ('Adds the correct settings when not retrieving request origin', () => {
      const returnedFunction = corsMiddleware('test.nl,test.com');
      const request = new RequestMock(null);
      const response = new ResponseMock();
      returnedFunction(request, response, () => {});
      expect(response.headers['Access-Control-Allow-Origin'])
        .to.equal(undefined);
      expect(response.headers['Access-Control-Allow-Methods'])
        .to.equal(undefined);
      expect(response.headers['Access-Control-Allow-Headers'])
        .to.equal(undefined);
      expect(response.headers['Content-Type'])
        .to.equal('application/json');
    });
  });
});
