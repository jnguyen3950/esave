var app = angular.module('esave');

app.factory('Search', search);

function search($http) {
  var currentURL = window.location.origin;
  function items(term, zip, dist, minPrice, maxPrice, page) {
    this.term = term || "Fashion";
    this.zip = zip;
    this.dist = dist || 25;
    this.minPrice = minPrice || 10;
    this.maxPrice = maxPrice || 100;
    this.page = page || 1;

    return $http.get(currentURL+'/search/'+this.term+'/'+this.zip+'/'+this.dist+'/'+this.minPrice+'/'+this.maxPrice+'/'+this.page);
  }
  return {
    items: items
  }
}
