var app = angular.module('esave');

app.factory('Search', search);

function search($http) {
  function items(term, zip, dist, minPrice, maxPrice) {
    currentURL = window.location.origin;

    this.zip = zip.value || 92660;
    this.dist = dist.value || 25;
    this.minPrice = minPrice.value || 10;
    this.maxPrice = maxPrice.value || 100;
    return $http.get(currentURL + '/search/'+term+'/'+this.zip+'/'+this.dist+'/'+this.minPrice+'/'+this.maxPrice);
  }
  return {
    items: items
  }
}
