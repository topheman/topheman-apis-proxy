'use strict';

var app = require('../../app');
var request = require('supertest');
var should = require('should');

describe('Handlers configuration - Activate part', function () {
  it('option.active === true > handler should respond', function (done) {
    request(app)
            .get('/testActive1')
            .expect(200)
            .end(done);
  });
  it('option.active === false > handler should NOT respond', function (done) {
    request(app)
            .get('/testActive2')
            .expect(404)
            .end(done);
  });
  it('option.active is missing > handler should NOT respond', function (done) {
    request(app)
            .get('/testActive3')
            .expect(404)
            .end(done);
  });
  it('option is not declared > handler should NOT respond', function (done) {
    request(app)
            .get('/testActive4')
            .expect(404)
            .end(done);
  });
});