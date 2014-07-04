'use strict';

var expect = require('chai').expect;
var tree = require('../');
var shrinked = require('shrinked');
var fixture = require('test-fixture')();
var jf = require('jsonfile');

var cases = {
  full: {
    types: [
      'devDependencies',
      'asyncDependencies',
      'dependencies',
      'engines'
    ],
    e: function (tree, e) {
      expect(tree).to.deep.equal(e);
    }
  },
  pro: {
    types: [
      'asyncDependencies',
      'dependencies',
      'engines'
    ],
    e: function (tree, e) {
      expect(tree).to.deep.equal(e);
    }
  },
  pro_no_engine: {
    tree: [
      'asyncDependencies',
      'dependencies'
    ],
    e: function (tree, e) {
      expect(tree).to.deep.equal(e);
    }
  }
};

var shrinkwrap = jf.readFileSync(fixture.resolve('shrink.json'));
var expected = require(fixture.resolve('expected'));
var pkg = {
  "name": "unit-m-customer"
  "version": "0.0.0"
};

Object.keys(cases).forEach(function (type) {
  var c = cases[type];
  describe(type, function(){
    it("tree()", function(){
      tree()
      var parsed = shrinked.parse(shrinkwrap, {
        dependencyKeys: c.types
      });

      var t = tree.parse(parsed, c.types);
      c.e(t, expected[type]);
    });
  });
});
