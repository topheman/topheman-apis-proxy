var app = require('../../app');
var request = require('supertest');
var should = require('should');

describe('Main router', function () {
  it('should respond with 404 on unknown route', function (done) {
    request(app)
            .get('/unkown/route')
            .expect(404)
            .expect(function(res){
              var result = res.body;
              if(!result.error){
                return "No error in response";
              }
              if(result.error && !result.error.message){
                return "No message in error in response";
              }
              if(result.error && result.error.message && result.error.message !== "Not found"){
                return "Uncorrect response, error.message should be \"Not found\"";
              }
            })
            .end(done);
  });
});