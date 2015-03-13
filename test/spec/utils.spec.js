'use strict';

var should = require('should');
var expect = require('chai').expect;
var utils = require('../../utils/utils');

describe('utils', function () {

  describe('formatUrl', function () {


    describe('simple query params add', function () {

      it('should not change url', function () {
        expect(utils.formatUrl('http://dev.topheman.com')).to.equal('http://dev.topheman.com');
      });

      it('should add ?foo=true', function () {
        expect(utils.formatUrl('http://dev.topheman.com', {queryParamsToAdd: 'foo=true'})).to.equal('http://dev.topheman.com/?foo=true');
      });

      it('should add &bar=false', function () {
        expect(utils.formatUrl('http://dev.topheman.com?foo=true', {queryParamsToAdd: 'bar=false'})).to.equal('http://dev.topheman.com/?foo=true&bar=false');
      });

      it('should add bar=false', function () {
        expect(utils.formatUrl('http://dev.topheman.com?foo=true&', {queryParamsToAdd: 'bar=false'})).to.equal('http://dev.topheman.com/?foo=true&bar=false');
      });

    });

    describe('query params add with an anchor', function () {

      it('should not change url (with #anchor)', function () {
        expect(utils.formatUrl('http://dev.topheman.com#anchor')).to.equal('http://dev.topheman.com#anchor');
      });

      it('should add ?foo=true (with #anchor)', function () {
        expect(utils.formatUrl('http://dev.topheman.com#anchor', {queryParamsToAdd: 'foo=true'})).to.equal('http://dev.topheman.com/?foo=true#anchor');
      });

    });

    describe('changing host with "host" attribute', function () {

      it('should only change host to google.com', function () {
        expect(utils.formatUrl('http://dev.topheman.com', {host: 'google.com'})).to.equal('http://google.com/');
      });

      it('should add ?foo=true and change host to google.com', function () {
        expect(utils.formatUrl('http://dev.topheman.com', {queryParamsToAdd: 'foo=true', host: 'google.com'})).to.equal('http://google.com/?foo=true');
      });

    });

    describe('changing host (with "host" attribute) and changing port', function () {

      it('should only change host to google.com and add port 8000', function () {
        expect(utils.formatUrl('http://dev.topheman.com', {host: 'google.com', port: 8000})).to.equal('http://google.com:8000/');
      });

      it('should add ?foo=true and change host to google.com and add port 8000', function () {
        expect(utils.formatUrl('http://dev.topheman.com', {queryParamsToAdd: 'foo=true', host: 'google.com', port: 8000})).to.equal('http://google.com:8000/?foo=true');
      });

    });

    describe('changing host with "hostname" attribute', function () {

      it('should only change host to google.com', function () {
        expect(utils.formatUrl('http://dev.topheman.com', {hostname: 'google.com'})).to.equal('http://google.com/');
      });

      it('should add ?foo=true and change host to google.com', function () {
        expect(utils.formatUrl('http://dev.topheman.com', {queryParamsToAdd: 'foo=true', hostname: 'google.com'})).to.equal('http://google.com/?foo=true');
      });

    });

    describe('changing host (with "hostname" attribute) and changing port', function () {

      it('should only change host to google.com and add port 8000', function () {
        expect(utils.formatUrl('http://dev.topheman.com', {hostname: 'google.com', port: 8000})).to.equal('http://google.com:8000/');
      });

      it('should add ?foo=true and change host to google.com and add port 8000', function () {
        expect(utils.formatUrl('http://dev.topheman.com', {queryParamsToAdd: 'foo=true', hostname: 'google.com', port: 8000})).to.equal('http://google.com:8000/?foo=true');
      });

    });

  });

  describe('generateUrl', function () {

      it('should not change url if no params', function () {
        expect(utils.generateUrl('http://dev.topheman.com')).to.equal('http://dev.topheman.com');
      });

      it('should not change url if empty params', function () {
        expect(utils.generateUrl('http://dev.topheman.com',{})).to.equal('http://dev.topheman.com');
      });

      it('should remove ? if no params', function () {
        expect(utils.generateUrl('http://dev.topheman.com?')).to.equal('http://dev.topheman.com');
      });

      it('should add ?foo=true', function () {
        expect(utils.generateUrl('http://dev.topheman.com', {foo: true})).to.equal('http://dev.topheman.com?foo=true');
      });

      it('should add &bar=false', function () {
        expect(utils.generateUrl('http://dev.topheman.com?foo=true', {bar: false})).to.equal('http://dev.topheman.com?foo=true&bar=false');
      });

      it('should add bar=false', function () {
        expect(utils.generateUrl('http://dev.topheman.com?foo=true&', {bar: false})).to.equal('http://dev.topheman.com?foo=true&bar=false');
      });

  });

});