var app = angular.module('esave');

app.controller('searchController', search);

function search($http, Search) {
  var vm = this;

  vm.newSearch = function(term, zip, dist, minPrice, maxPrice) {
    this.zip = zip || 92660;
    this.dist = dist || 25;
    this.minPrice = minPrice || 0;
    this.maxPrice = maxPrice || 100;
    var promise = new Promise(function(resolve, reject) {
      window.navigator.geolocation.getCurrentPosition(function(pos){
        $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+pos.coords.latitude+','+pos.coords.longitude+'&sensor=true').then(function(res){
          $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+pos.coords.latitude+','+pos.coords.longitude+'&sensor=true').then(function(res){
            var zipcode = res.data.results[0].address_components[6].long_name;
            vm.zipcode = zipcode;
            resolve(zipcode);
          });
        });
      });
    });

    promise.then(function(zipcode) {
      var items = Search.items(term, this.zip, this.dist, this.minPrice, this.maxPrice);
      items.then(function(result) {
        vm.list = result.data.findItemsByKeywordsResponse[0].searchResult[0].item;
      });
    });
  }

  vm.createDynamicURL = function(item) {
    return "/#/info/" + item.itemId[0];
  }
}
