var app = angular.module('esave');

app.controller('searchController', search);

app.$inject = ['userService'];

function search(userService) {
  var vm = this;
  var promise = userService.search("Harry Potter");
  promise.then(function(result) {
    vm.list = result.data.findItemsByKeywordsResponse[0].searchResult[0].item;
  });

  vm.newSearch = function(term) {
    var data = term;
    var promise = userService.search(term);
    promise.then(function(result) {
      vm.list = result.data.findItemsByKeywordsResponse[0].searchResult[0].item;
    });
  }
}
