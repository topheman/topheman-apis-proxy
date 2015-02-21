var app = require('../../app');
var request = require('supertest');
var should = require('should');

describe('home page', function () {
  describe('reponse Content-Type', function () {
    it('should respond with html when no accept header nor query was sent', function (done) {
      request(app)
              .get('/')
              .expect(200)
              .expect('Content-Type','text/html; charset=utf-8')
              .end(done);
    });
  });
});