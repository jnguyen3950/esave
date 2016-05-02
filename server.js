var express = require('express');
var app = express();
var jsonParser = require('body-parser').json();
var cookieParser = require('cookie-parser');
var querystring = require('querystring');
var request = require('request');
var _ = require('underscore');
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost/esave';

var appID = "JustinNg-Loclist-PRD-04d8cb72c-0a1a082c";
var devID = "6ae2db01-f633-4ac3-8294-c4c121e98ea2";
var certID = "PRD-4d8cb72c0f2d-9aca-420a-ae49-327d";

app.use(express.static('./public/'));

app.get('/greeting/:itemId', function(req, res) {
  if(req.params.itemId == undefined) res.sendStatus(404);
  else {
    request('http://svcs.ebay.com/services/search/FindingService/v1?'
   + 'OPERATION-NAME=findItemsByCategory&'
   + 'SERVICE-VERSION=1.0.0&'
   + 'SECURITY-APPNAME=' + appID
   + '&RESPONSE-DATA-FORMAT=XML&'
   + 'REST-PAYLOAD&'
   + 'categoryId=19167&'
   + 'buyerPostalCode=92660&'
   + 'itemFilter.name=MaxDistance&'
   + 'itemFilter.value=25&'
   + 'paginationInput.entriesPerPage=10', function(err, response, body) {
     if(err) res.sendStatus(err);
     res.send(body);
   })
  }
});

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

app.get('/info/:itemId', function(req, res) {
  var queryParam = {
    'itemId': req.params.itemId,
    'IncludeSelector': 'Details, ShippingCosts'
  }

  request('http://open.api.ebay.com/shopping?'
  + 'callname=GetSingleItem&'
  + 'responseencoding=JSON&'
  + 'appid=' + appID
  + '&siteid=0&'
  + 'version=515&'
  + querystring.stringify(queryParam), function(err, response, body) {
    if(err) res.sendStatus(err);
    res.send(body);
  });
});

app.post('/add/:itemId', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if(err) res.sendStatus(err);
    else {
      insertDocument(db, req.params.itemId, function() {
        db.close();
      })
    }
    res.send();
  });
});

var insertDocument = function(db, itemId, callback) {
  var collection = db.collection('esave');
  collection.insert({itemId: itemId}), function(err, result) {
    console.log("Inserting");
    callback(result);
  }
}

if(!require.main.loaded) {
  var server = app.listen(8080);
}

module.exports = app;
