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

});