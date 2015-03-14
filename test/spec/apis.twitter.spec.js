'use strict';

var app = require('../../app');
var request = require('supertest');
var should = require('should');
var expect = require('chai').expect;

describe('api.twitter', function () {

  it('root page should respond with html', function (done) {
    request(app)
            .get('/twitter')
            .expect(200)
            .expect('Content-Type', 'text/html; charset=utf-8')
            .end(done);
  });

  it('post request should respond HTTP 403', function (done) {
    request(app)
            .post('/twitter/users/show/topheman')
            .expect(403)
            .end(done);
  });

  it('get request should respond HTTP 200', function (done) {
    request(app)
            .get('/twitter/users/show/topheman')
            .expect(200)
            .end(done);
  });

  it('Etag response headers should be removed (prevent browser caching, keep data fresh)', function (done) {
    request(app)
            .get('/twitter/users/show/topheman')
            .expect(function (res) {
              if (res.headers['etag']) {
                return "Etag response header is present, shouldn't be";
              }
            })
            .end(done);
  });

  it('x-rate-limit-* response headers should be present', function (done) {
    request(app)
            .get('/twitter/users/show/topheman')
            .expect('x-rate-limit-limit', '180')
            .expect('x-rate-limit-remaining', '179')
            .expect('x-rate-limit-reset', '1426357885')
            .end(done);
  });

});