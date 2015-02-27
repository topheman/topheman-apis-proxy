'use strict';

var should = require('should');
var expect = require('chai').expect;
var helpers = require('../../utils/helpers');
var urlHelper = require('url');

var mockRequest = function (url, body) {
  this.url = url;
  this.body = body;
  this.parsedRequest = urlHelper.parse(url);
  this.protocol = this.parsedRequest.protocol.replace(':','');//express doesn't keep the column
  this.baseUrl = this.parsedRequest.path;
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
var API_BASE_URL_PATH = 'http://localhost:9000/';

describe('utils', function () {

  describe('transformResponseBody', function () {

    describe('replaceBaseUrlInJson', function () {

      var request, responseBody;

      beforeEach(function () {
        request = new mockRequest(API_BASE_URL_PATH, mockResponse);
        responseBody = JSON.parse(helpers.transformResponseBody.replaceBaseUrlInJson(mockResponse, request, API_BASE_URL_PATH_TO_REPLACE));
      });

      it('base url should have changed', function () {
        expect(responseBody.current_user_url).to.be.equal('http://localhost:9000/user');
      });

    });

  });

});