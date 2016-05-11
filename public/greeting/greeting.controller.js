var app = angular.module('esave');

app.controller('greetingController', greeting);

function greeting($http, Greeting) {
  var vm = this;
  vm.page = 1;
  vm.bigList = [];

  var xhr = new XMLHttpRequest;
  xhr.open('GET', '/mongo/read');
  xhr.send();
  xhr.addEventListener('load', function() {
    var response = JSON.parse(xhr.responseText);
    for (var i = response.length - 1; i >= 0 ; i--) {
      cateSearch(response[i].categoryId);
    }
  });

  function cateSearch(categoryId) {
    var promise = Greeting.relatedItems(categoryId);
    promise.then(function(result) {
      var itemsArray = result.data.findItemsByCategoryResponse[0].searchResult[0].item;
      var refinedList = [];
      for(i = 0; i < itemsArray.length && refinedList.length < 6; i++) {
        if(itemsArray[i].shippingInfo[0].shippingServiceCost[0].__value__ > 0) {
          refinedList.push(itemsArray[i]);
        }
      }
      vm.bigList.push(refinedList);
    });
  }
}
