'use strict';

var should = require('should');
var expect = require('chai').expect;
var helpers = require('../../utils/helpers');
var urlHelper = require('url');

var mockRequest = function (url, body) {
  this.url = url;
  this.body = body;
  this.parsedRequest = urlHelper.parse(url);
  this.protocol = this.parsedRequest.protocol.replace(':', '');//express doesn't keep the column
  this.baseUrl = this.parsedRequest.path;
  this.originalUrl = this.baseUrl;
  this.get = function (key) {
    var result;
    switch (key) {
      case 'host':
        result = this.parsedRequest.host;
        break;
      default :
        throw new Error('Only takes "host" as argument');
    }
    return result;
  };
};

var mockResponse = require('../mocks/apis/githubApiMock/responses/root');

var API_BASE_URL_PATH_TO_REPLACE = 'https://api.github.com/';
var API_BASE_URL_PATH = 'http://localhost:8000/';

describe('helpers', function () {

  describe('transformResponseBody', function () {

    describe('replaceBaseUrlInJson', function () {

      var request, responseBody;

      beforeEach(function () {
        request = new mockRequest(API_BASE_URL_PATH, mockResponse);
        responseBody = JSON.parse(helpers.transformResponseBody.replaceBaseUrlInJson(mockResponse, request, API_BASE_URL_PATH_TO_REPLACE));
      });

      it('base url should have changed', function () {
        expect(responseBody.current_user_url).to.be.equal('http://localhost:8000/user');
      });

    });

  });

  describe('getApiBasePath', function () {

    it('should return http://localhost:8000', function () {
      expect(helpers.getApiBasePath('https://api.github.com')).to.be.equal('http://localhost:8000');
    });

  });

  describe('forwardPathUrlReplacer', function () {

    describe('Factory', function () {

      var request;

      beforeEach(function () {
        request = new mockRequest('http://localhost:8000/myApiHandler', {"foo": "bar"});
      });

      it('dev / prod mode', function () {
        var forwardPathUrlReplacer = helpers.forwardPathUrlReplacer.Factory('/myApiHandler');
        expect(forwardPathUrlReplacer(request)).to.be.equal('');
      });

      it('test mode', function () {
        var forwardPathUrlReplacer = helpers.forwardPathUrlReplacer.Factory('/myApiHandler', '/myApiHandlerMock');
        expect(forwardPathUrlReplacer(request)).to.be.equal('/myApiHandlerMock');
      });

    });

  });

});