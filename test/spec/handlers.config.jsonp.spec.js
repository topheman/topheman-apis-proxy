'use strict';

var app = require('../../app');
var request = require('supertest');
var should = require('should');

describe('Handlers configuration - disableJsonp part', function () {

  it('option.jsonp === cb + request ?cb=foo should http 403', function (done) {
    request(app)
            .get('/testJsonp?cb=foo')
            .expect(403)
            .end(done);
  });

  it('option.jsonp === cb + request ?callback=foo should http 200', function (done) {
    request(app)
            .get('/testActive1?callback=foo')
            .expect(200)
            .end(done);
  });

});