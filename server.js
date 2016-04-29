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

app.get('/search/:term/:zip/:distance/:minPrice/:maxPrice', function(req, res) {
  if(req.params.term == undefined) res.sendStatus(404);
  else {
    var queryParam = {
      'keywords': req.params.term,
      'buyerPostalCode': req.params.zip,
      'itemFilter.name': 'MaxDistance',
      'itemFilter.value': req.params.distance,
      'paginationInput.entriesPerPage': 10,
      'paginationInput.pageNumber': 1
    }

    request('http://svcs.ebay.com/services/search/FindingService/v1?'
    + 'OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.13.0'
    + '&SECURITY-APPNAME=' + appID
    + '&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&'
    + querystring.stringify(queryParam), function(err, response, body) {
      if(err) res.sendStatus(err);
      res.send(body);
    });
  }
});

// app.get('/info/:productId', function(req, res) {
//   var queryParam = {
//     'productId': "3400594"
//   }
//
//   request('http://svcs.ebay.com/services/search/FindingService/v1?'
//   + 'OPERATION-NAME=findItemsByProduct&SERVICE-VERSION=1.13.0'
//   + '&SECURITY-APPNAME=' + appID
//   + '&RESPONSE-DATA-FORMAT=XML&REST-PAYLOAD&'
//   + 'paginationInput.entriesPerPage=2&'
//   + 'productId.@type=ReferenceID&'
//   + querystring.stringify(queryParam), function(err, response, body) {
//     if(err) res.sendStatus(err);
//     res.send(body);
//   });
// });

app.get('/info/:itemId', function(req, res) {
  console.log(req.params.itemId);
  var queryParam = {
    'itemId': req.params.itemId
  }

  request('http://open.api.ebay.com/shopping?'
  + 'callname=GetSingleItem&'
  + 'responseencoding=XML&'
  + 'appid=' + appID
  + '&siteid=0&'
  + 'version=515&'
  + querystring.stringify(queryParam), function(err, response, body) {
    if(err) res.sendStatus(err);
    res.send(body);
  });
})

if(!require.main.loaded) {
  var server = app.listen(8080);
}

module.exports = app;
