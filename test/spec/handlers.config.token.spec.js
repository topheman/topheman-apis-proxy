'use strict';

var app = require('../../app');
var request = require('supertest');
var should = require('should');

describe('Handlers configuration - token part', function () {

  it('option.token = "mytoken" request without token header should respond 403', function (done) {
    request(app)
            .get('/testToken1')
            .expect(403)
            .end(done);
  });

  it('option.token = "mytoken" request with token header should respond 200', function (done) {
    request(app)
            .get('/testToken1')
            .set('X-Auth-Token', 'mytoken')
            .expect(200)
            .end(done);
  });

});