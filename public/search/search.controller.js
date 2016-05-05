var app = angular.module('esave');

app.controller('searchController', search);

function search($http, Search) {
  var vm = this;
  currentRoute = window.location.hash;
  var categoryText = currentRoute.substring(9, currentRoute.length);

  vm.init = function() {
    vm.list = [];
    vm.loading = true;
    vm.switch();

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
      vm.term = categoryText || "Antiques";
      vm.zip = value;
      vm.dist = 25;
      vm.min = 0;
      vm.max = 100;
      vm.page = 1;
      vm.currentSearch = value;
      vm.loading = false;

      vm.switch();
      search();
    });
  }

  vm.newSearch = function(term, zip, dist, minPrice, maxPrice) {
    vm.list = [];
    vm.term = term;
    vm.zip = zip || vm.zipcode;
    vm.dist = dist || 25;
    vm.min = minPrice || 0;
    vm.max = maxPrice || 100;
    vm.page = 1;
    vm.currentSearch = this.zip;
    search();
  }

  vm.showMore = function() {
    vm.page++;
    search();
  }

  vm.createDynamicURL = function(item) {
    return "/#/info/" + item.itemId[0];
  }

  vm.switch = function(value) {
    return vm.loading;
  }

  function search() {
    var items = Search.items(vm.term, vm.zip, vm.dist, vm.min, vm.max, vm.page);
    items.then(function(result) {
      var currentPage = result.data.findItemsByKeywordsResponse[0].paginationOutput[0].pageNumber[0];
      var maxPage = result.data.findItemsByKeywordsResponse[0].paginationOutput[0].totalPages[0];

      if(currentPage < maxPage) {
        var itemsArray = result.data.findItemsByKeywordsResponse[0].searchResult[0].item;
        for(i = 0; i < itemsArray.length; i++) {
          if(itemsArray[i].shippingInfo[0].shippingServiceCost[0].__value__ > 0) {
            vm.list.push(itemsArray[i]);
          }
        }
        if(vm.list.length < 15) {
          vm.page++;
          search();
        }
      }
    });
  }
}
