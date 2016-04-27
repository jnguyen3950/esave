var app = angular.module('esave');

app.controller('searchController', search);

function search($http, Search) {
  var vm = this;

  vm.newSearch = function(term) {
    var promise = Search.items(term);
    promise.then(function(result) {
      vm.list = result.data.findItemsByKeywordsResponse[0].searchResult[0].item;
    });
  }
}
