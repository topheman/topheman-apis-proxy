'use strict';

var app = require('../../app');
var request = require('supertest');
var should = require('should');

describe('Handlers configuration - CORS part', function () {

  describe('Check active or not', function () {
    it('option.cors === true > Header Acces-Control-Allow-Origin should be *', function (done) {
      request(app)
              .get('/testCorsActive1')
              .expect(200)
              .expect('Access-Control-Allow-Origin', '*')
              .end(done);
    });
    it('option.cors === false > Header Access-Control-Allow-Origin shouldn\'t be set', function (done) {
      request(app)
              .get('/testCorsActive2')
              .expect(200)
              .expect(function (res) {
                if (res.headers['Access-Control-Allow-Origin'.toLowerCase()]) {
                  return "Access-Control-Allow-Origin header is present and shouldn't";
                }
              })
              .end(done);
    });
    it('option.cors === [] > Header Access-Control-Allow-Origin shouldn\'t be set', function (done) {
      request(app)
              .get('/testCorsActive3')
              .expect(200)
              .expect(function (res) {
                if (res.headers['Access-Control-Allow-Origin'.toLowerCase()]) {
                  return "Access-Control-Allow-Origin header is present and shouldn't";
                }
              })
              .end(done);
    });
    it('option.cors === "" > Header Access-Control-Allow-Origin shouldn\'t be set', function (done) {
      request(app)
              .get('/testCorsActive4')
              .expect(200)
              .expect(function (res) {
                if (res.headers['Access-Control-Allow-Origin'.toLowerCase()]) {
                  return "Access-Control-Allow-Origin header is present and shouldn't";
                }
              })
              .end(done);
    });
    it('option.cors attribute missing > Header Access-Control-Allow-Origin shouldn\'t be set', function (done) {
      request(app)
              .get('/testCorsActive5')
              .expect(200)
              .expect(function (res) {
                if (res.headers['Access-Control-Allow-Origin'.toLowerCase()]) {
                  return "Access-Control-Allow-Origin header is present and shouldn't";
                }
              })
              .end(done);
    });
  });

  describe('Check CORS pattern domains', function () {
    
    describe('Access restricted to cors = "foo.com"', function () {
      it('request from foo.com should accept CORS', function (done) {
        request(app)
                .get('/testCorsPattern1')
                .set('Origin', 'http://foo.com')
                .expect(200)
                .expect('Access-Control-Allow-Origin', 'http://foo.com')
                .end(done);
      });
      it('request NOT from foo.com should deny CORS', function (done) {
        request(app)
                .get('/testCorsPattern1')
                .expect(200)
                .set('Origin', 'http://anywhere.com')
                .expect(function (res) {
                  if (res.headers['Access-Control-Allow-Origin'.toLowerCase()]) {
                    return "Access-Control-Allow-Origin header is present and shouldn't";
                  }
                })
                .end(done);
      });
    });
    
    describe('Access restricted to cors = ["foo.com","bar.com"]',function(){
      it('request from foo.com should accept CORS', function (done) {
        request(app)
                .get('/testCorsPattern2')
                .set('Origin', 'http://foo.com')
                .expect(200)
                .expect('Access-Control-Allow-Origin', 'http://foo.com')
                .end(done);
      });
      it('request NOT from foo.com should deny CORS', function (done) {
        request(app)
                .get('/testCorsPattern2')
                .expect(200)
                .set('Origin', 'http://anywhere.com')
                .expect(function (res) {
                  if (res.headers['Access-Control-Allow-Origin'.toLowerCase()]) {
                    return "Access-Control-Allow-Origin header is present and shouldn't";
                  }
                })
                .end(done);
      });
      it('request from bar.com should accept CORS', function (done) {
        request(app)
                .get('/testCorsPattern2')
                .set('Origin', 'http://bar.com')
                .expect(200)
                .expect('Access-Control-Allow-Origin', 'http://bar.com')
                .end(done);
      });
      it('request NOT from bar.com should deny CORS', function (done) {
        request(app)
                .get('/testCorsPattern2')
                .expect(200)
                .set('Origin', 'http://anywhere.com')
                .expect(function (res) {
                  if (res.headers['Access-Control-Allow-Origin'.toLowerCase()]) {
                    return "Access-Control-Allow-Origin header is present and shouldn't";
                  }
                })
                .end(done);
      });
    });
    
    describe('Access restricted to cors = ["*.foo.com","bar.com"]',function(){
      it('request from foo.com should accept CORS', function (done) {
        request(app)
                .get('/testCorsPattern3')
                .set('Origin', 'http://foo.com')
                .expect(200)
                .expect('Access-Control-Allow-Origin', 'http://foo.com')
                .end(done);
      });
      it('request NOT from foo.com should deny CORS', function (done) {
        request(app)
                .get('/testCorsPattern3')
                .expect(200)
                .set('Origin', 'http://anywhere.com')
                .expect(function (res) {
                  if (res.headers['Access-Control-Allow-Origin'.toLowerCase()]) {
                    return "Access-Control-Allow-Origin header is present and shouldn't";
                  }
                })
                .end(done);
      });
      it('request from subdomain.foo.com should accept CORS', function (done) {
        request(app)
                .get('/testCorsPattern3')
                .set('Origin', 'http://subdomain.foo.com')
                .expect(200)
                .expect('Access-Control-Allow-Origin', 'http://subdomain.foo.com')
                .end(done);
      });
      it('request NOT from subdomain.bar.com should deny CORS', function (done) {
        request(app)
                .get('/testCorsPattern3')
                .expect(200)
                .set('Origin', 'http://subdomain.bar.com')
                .expect(function (res) {
                  if (res.headers['Access-Control-Allow-Origin'.toLowerCase()]) {
                    return "Access-Control-Allow-Origin header is present and shouldn't";
                  }
                })
                .end(done);
      });
    });
    
  });

});