'use strict';

var app = require('../../app');
var request = require('supertest');
var should = require('should');

describe('Handlers configuration - delay part', function () {

  it('option.delay = 50, should delay', function (done) {
    var time = (new Date()).getTime();
    request(app)
            .get('/testDelay')
            .expect(function (res) {
              if (((new Date()).getTime() - time) < 50) {
                return "Response took less than 50ms";
              }
            })
            .expect('x-delay-milliseconds', 50)
            .end(done);
  });

});