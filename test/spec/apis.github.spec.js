'use strict';

var app = require('../../app');
var request = require('supertest');
var should = require('should');
var expect = require('chai').expect;
var server;

describe('api.github', function () {

  it('should redirect /github to /github/ when no trailing slashes', function (done) {
    request(app)
            .get('/github')
            .expect(301)
            .expect('Location', '/github/')
            .end(done);
  });

  describe('proxy', function () {

    before(function (done) {
      app = require('../../app');
      server = app.listen(8001, function () {
        //console.log('listening to 8001');
        done();
      });
    });

    after(function () {
      //console.log('closing to 8001');
      server.close();
    });

    it('should proxy api', function (done) {
      request(app)
              .get('/github/')
              .expect(200)
              .expect('Content-Type', 'application/json; charset=utf-8')
              .end(done);
    });

    it('should proxy api, rewriting the host', function (done) {
      request(app)
              .get('/github/')
              .expect(200)
              .expect('Content-Type', 'application/json; charset=utf-8')
              .expect(function (res) {
                try {
                  var result = res.body;
                  if (!res.body) {
                    return "No body in response";
                  }
                  else {
                    expect(result.current_user_url).to.equal(res.request.protocol + '//' + res.request.host + '/github/user');
                  }
                }
                catch (e) {
                  return e.message;
                }
              })
              .end(done);
    });

    it('should proxy api, passing response headers through', function (done) {
      request(app)
              .get('/github/')
              .expect(200)
              .expect('X-Github-Api-Mock', 'test')
              .end(done);
    });

    it('should proxy api, to any deep uri like /users/topheman', function (done) {
      request(app)
              .get('/github/users/topheman')
              .expect(200)
              .expect('Content-Type', 'application/json; charset=utf-8')
              .expect(function (res) {
                try {
                  var result = res.body;
                  if (!res.body) {
                    return "No body in response";
                  }
                  else {
                    expect(result.url).to.equal(res.request.protocol + '//' + res.request.host + '/github/users/topheman');
                  }
                }
                catch (e) {
                  return e.message;
                }
              })
              .end(done);
    });

    it('should also proxy the "Server Error" status code in http response header', function (done) {
      request(app)
              .get('/github/errors/500')
              .expect(500)
              .end(done);
    });

  });

});