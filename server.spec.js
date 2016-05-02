var chai = require('chai');
var assert = chai.assert;
var request = require('request');

var app = require('./server.js');
var RANDOMIZE = 0;
var server = app.listen(RANDOMIZE);
var port = server.address().port;
var url = 'http://localhost:' + port;

describe('eSave Mocha tests:', function() {
  describe('Get request for general nearby items.', function() {
    it('is returned with responses.', function(done) {
      request(url + '/search/Lego/92660/25/0/100', function(error, res, body) {
        assert.equal(error, null);
        assert.equal(res.statusCode, 200);
        done();
      })
    })

    after(function(done) {
      server.close();
      done();
    })
  })
})
