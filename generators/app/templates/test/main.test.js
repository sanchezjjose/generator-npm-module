'use strict';

var expect = require('chai').expect;
var main = require('../lib/main');

describe('main', function () {

    it('foo is bar', function () {
        let result = main.foo;
        expect(result).to.equal('bar');
    });
});
