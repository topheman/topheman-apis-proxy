var app = require('../../app');
var request = require('supertest');
var should = require('should');
var expect = require('chai').expect;

describe('home page', function () {
  describe('reponse Content-Type', function () {
    describe('based on Accept Headers in request', function () {
      it('should respond with text/html content-type when no Accept request header nor query was sent', function (done) {
        request(app)
                .get('/')
                .expect(200)
                .expect('Content-Type', 'text/html; charset=utf-8')
                .end(done);
      });
      it('should respond with application/json content-type when explicit json Accept request header is sent', function (done) {
        request(app)
                .get('/')
                .set('Accept', 'application/json, text/javascript, */*; q=0.01')
                .expect(200)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .end(done);
      });
      it('should respond with application/xml content-type when explicit xml Accept request header is sent', function (done) {
        request(app)
                .get('/')
                .set('Accept', 'application/xml, text/xml, */*; q=0.01')
                .expect(200)
                .expect('Content-Type', 'text/xml; charset=utf-8')
                .end(done);
      });
    });

    describe('based on query parameters (takes precedence on Accept Headers)', function () {
      it('should respond with application/json content-type when query ?format=json', function (done) {
        request(app)
                .get('/?format=json')
                .expect(200)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .end(done);
      });
      it('should respond with application/xml content-type when query ?format=xml', function (done) {
        request(app)
                .get('/?format=xml')
                .expect(200)
                .expect('Content-Type', 'text/xml; charset=utf-8')
                .end(done);
      });
      it('should respond with application/json content-type when query ?format=json, even with other Accept request header', function (done) {
        request(app)
                .get('/?format=json')
                .set('Accept', 'application/xml, text/xml, */*; q=0.01')
                .expect(200)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .end(done);
      });
      it('should respond with application/xml content-type when query ?format=xml, even with other Accept request header', function (done) {
        request(app)
                .get('/?format=xml')
                .set('Accept', 'application/json, text/javascript, */*; q=0.01')
                .expect(200)
                .expect('Content-Type', 'text/xml; charset=utf-8')
                .end(done);
      });
      it('should respond with text/html content-type when query ?format=html, even with other Accept request header', function (done) {
        request(app)
                .get('/?format=html')
                .set('Accept', 'application/json, text/javascript, */*; q=0.01')
                .expect(200)
                .expect('Content-Type', 'text/html; charset=utf-8')
                .end(done);
      });
    });
    
    describe('Listing of the active apis', function(){
      it('api list should be correct (taking in account the active part of config)',function(done){
        request(app)
                .get('/')
                .set('Accept', 'application/json, text/javascript, */*; q=0.01')
                .expect(200)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(function(res){
                  try{
                    var result = res.body;
                    if(!result.apis){
                      return "No APIs listed";
                    }
                    else{
                      var apiList = Object.keys(result.apis);
                      expect([
                        'testActive1',
                        'testCorsActive1',
                        'testCorsActive2',
                        'testCorsActive3',
                        'testCorsActive4',
                        'testCorsActive5',
                        'testCorsPattern1',
                        'testCorsPattern2',
                        'testCorsPattern3' 
                      ]).to.eql(apiList);
                    }
                  }
                  catch(e){
                    return e.message;
                  }
                })
                .end(done);
      });
    });
    
  });
});