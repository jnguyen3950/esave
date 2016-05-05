var app = angular.module('esave');

app.controller('searchController', search);

function search($http, Search) {
  var vm = this;
  currentRoute = window.location.hash;
  var categoryText = currentRoute.substring(9, currentRoute.length);

  vm.init = function() {
    var promise = new Promise(function(resolve, reject) {
      window.navigator.geolocation.getCurrentPosition(function(pos){
        $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+pos.coords.latitude+','+pos.coords.longitude+'&sensor=true').then(function(res){
          $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+pos.coords.latitude+','+pos.coords.longitude+'&sensor=true').then(function(res){
            var zipcode = res.data.results[0].address_components[6].long_name;
            vm.currentPlace = res.data.results[0].address_components[2].short_name + ', ' + res.data.results[0].address_components[4].short_name + ' ' + res.data.results[0].address_components[6].short_name;
            vm.zipcode = zipcode;
            resolve(zipcode);
          });
        });
      });
    });
    promise.then(function(value) {
      var items = Search.items(categoryText, value, 25, 0, 100);
      items.then(function(result) {
        vm.currentSearch = value;
        vm.list = result.data.findItemsByKeywordsResponse[0].searchResult[0].item;
      });
    });
  }

  vm.newSearch = function(term, zip, dist, minPrice, maxPrice) {
    this.zip = zip || vm.zipcode;
    this.dist = dist || 25;
    this.minPrice = minPrice || 0;
    this.maxPrice = maxPrice || 100;

    vm.currentSearch = this.zip;

    var items = Search.items(term, this.zip, this.dist, this.minPrice, this.maxPrice);
    items.then(function(result) {
      vm.list = result.data.findItemsByKeywordsResponse[0].searchResult[0].item;
    });
  }

  vm.createDynamicURL = function(item) {
    return "/#/info/" + item.itemId[0];
  }
}
