var appID = "JustinNg-Loclist-PRD-04d8cb72c-0a1a082c";
var devID = "6ae2db01-f633-4ac3-8294-c4c121e98ea2";
var certID = "PRD-4d8cb72c0f2d-9aca-420a-ae49-327d";

var sendGridID = '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';

var express = require('express');
var app = express();
var jsonParser = require('body-parser').json();
var cookieParser = require('cookie-parser');
var querystring = require('querystring');
var request = require('request');
var _ = require('underscore');

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://jnguyen3950:jnguyen3950@ds013232.mlab.com:13232/esave';

var sendgrid  = require('sendgrid')(sendGridID);

app.use(express.static('./public/'));

app.get('/greeting/:categoryId', function(req, res) {
  if(req.params.categoryId == undefined) res.sendStatus(404);
  else {
    request('http://svcs.ebay.com/services/search/FindingService/v1?'
   + 'OPERATION-NAME=findItemsByCategory&'
   + 'SERVICE-VERSION=1.0.0&'
   + 'SECURITY-APPNAME=' + appID
   + '&RESPONSE-DATA-FORMAT=JSON&'
   + 'REST-PAYLOAD&'
   + 'categoryId=' + req.params.categoryId
   + '&buyerPostalCode=92660&'
   + 'itemFilter.name=MaxDistance&'
   + 'itemFilter.value=25&'
   + 'paginationInput.entriesPerPage=6', function(err, response, body) {
     if(err) res.sendStatus(err);
     res.send(body);
   });
  }
});

app.get('/search/:term/:zip/:distance/:minPrice/:maxPrice/:page', function(req, res) {
  if(req.params.term == undefined) res.sendStatus(404);
  else {
    var queryParam = {
      'keywords': req.params.term,
      'buyerPostalCode': req.params.zip,
      'itemFilter(0).name': 'MaxDistance',
      'itemFilter(0).value': req.params.distance,
      'itemFilter(1).name': 'MinPrice',
      'itemFilter(1).value': req.params.minPrice,
      'itemFilter(2).name': 'MaxPrice',
      'itemFilter(2).value': req.params.maxPrice,
      'itemFilter(3).name': 'FreeShippingOnly',
      'itemFilter(3).value': 'false',
      'paginationInput.entriesPerPage': 30,
      'paginationInput.pageNumber': req.params.page
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

app.get('/userID', function(req, res) {
  request('http://open.api.ebay.com/shopping?'
   + 'callname=GetUserProfile&'
   + 'responseencoding=XML&'
   + 'appid=' + appID
   + '&siteid=0&'
   + 'version=525&'
   + 'UserID=snackstadium', function(err, response, body) {
     if(err) res.sendStatus(err);
     res.send(body);
   });
});

app.get('/email/:userEmailText/:sellerEmailText/:sellerName/:itemName/:price/:shipping/:negotiatePrice', function(req, res) {
  var email = new sendgrid.Email();
  if (req.params.negotiatePrice == undefined) {
    req.params.negotiatePrice = req.params.price;
  }

  this.negotiatePrice = req.params.negotiatePrice || req.params.price;

  email.to = req.params.sellerEmailText,
  email.from = req.params.userEmailText,
  email.subject = 'Price negotiate on item:',
  email.html = '<h2>Hello ' + req.params.sellerName + ',</h2>'
                + '<p>I saw that you have a listed item:</p>'
                + '<p><strong>' + req.params.itemName + '</strong></p>'
                + '<p>Price: <strong>' + req.params.price + '</strong></p>'
                + '<p>Shipping: <strong>' + req.params.shipping + '</strong></p>'
                + '<p>via eBay. </p>'
                + '<p>I would like to purchase the item for a total price of: $<strong>' + req.params.negotiatePrice + '</strong></p>'
                + '<p>Please reply if you are interested,</p>'
                + '<p>Anonymous</p>';
  email.setHeaders({full: 'hearts'});

  sendgrid.send(email, function(err, json) {
    if (err) res.send(err);
  });
});

app.get('/mongo/read/', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if(err) res.sendStatus(err);
    else {
      readDocument(db, function(docs) {
        db.close();
        res.send(docs);
      });
    }
  });
});

app.post('/mongo/create/:itemId/:categoryId', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if(err) res.sendStatus(err);
    else {
      insertDocument(db, req.params.itemId, req.params.categoryId, function() {
        db.close();
      });
    }
    res.send();
  });
});

var readDocument = function(db, callback) {
  var collection = db.collection('esave');
  collection.find({}).toArray(function(error, docs) {
    callback(docs);
  });
}

var insertDocument = function(db, itemId, categoryId, callback) {
  var collection = db.collection('esave');
  collection.insert({itemId: itemId, categoryId: categoryId}), function(err, result) {
    callback(result);
  }
}

if(!require.main.loaded) {
  var server = app.listen(process.env.PORT || 8080);
}

module.exports = app;
