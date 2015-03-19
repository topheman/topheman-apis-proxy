'use strict';

var app = require('../../app');
var request = require('supertest');
var should = require('should');

describe('Handlers configuration - token part', function () {

  it('option.token = "mytoken" request without X-Auth-Token header should respond 403', function (done) {
    request(app)
            .get('/testToken1')
            .expect(403)
            .end(done);
  });

  it('option.token = "mytoken" request with X-Auth-Token header should respond 200', function (done) {
    request(app)
            .get('/testToken1')
            .set('X-Auth-Token', 'mytoken1')
            .expect(200)
            .end(done);
  });

  it('option.token = function request without X-Auth-Token header should respond 403', function (done) {
    request(app)
            .get('/testToken2')
            .expect(403)
            .end(done);
  });

  it('option.token = function request with X-Auth-Token header should respond 200', function (done) {
    request(app)
            .get('/testToken2')
            .set('X-Auth-Token', 'mytoken2')
            .expect(200)
            .end(done);
  });

  it('option.token = function request with custom auth should respond 200', function (done) {
    request(app)
            .get('/testToken2')
            .set('X-Another-Way-To-Auth', (new Date()).getTime()+'.mytoken2')
            .expect(200)
            .end(done);
  });

});