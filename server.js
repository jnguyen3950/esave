var express = require('express');
var app = express();
var jsonParser = require('body-parser').json();
var cookieParser = require('cookie-parser');
var querystring = require('querystring');
var request = require('request');
var _ = require('underscore');

var appID = "JustinNg-Loclist-PRD-04d8cb72c-0a1a082c";
var devID = "6ae2db01-f633-4ac3-8294-c4c121e98ea2";
var certID = "PRD-4d8cb72c0f2d-9aca-420a-ae49-327d";

app.use(express.static('./public/'));

app.get('/search/:term', function(req, res) {
  if(req.params.term == undefined) res.sendStatus(404);
  else {
    var queryParam = {
      'keywords': req.params.term,
      'buyerPostalCode': 92660,
      'itemFilter.name': 'MaxDistance',
      'itemFilter.value': 25,
      'paginationInput.entriesPerPage': 10,
      'paginationInput.pageNumber': 1
    }

    request('http://svcs.ebay.com/services/search/FindingService/v1?'
    + 'OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.13.0'
    + '&SECURITY-APPNAME=' + appID
    + '&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&'
    + querystring.stringify(queryParam), function(err, response, body) {
      if(err) res.send(err);
      res.send(body);
    });
  }
});

if(!require.main.loaded) {
  var server = app.listen(8080);
}

module.exports = app;
