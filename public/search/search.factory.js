var app = angular.module('esave');

app.factory('Search', search);

function search($http) {
  function items(term, zip, dist, minPrice, maxPrice) {
    this.zip = zip.value || 92660;
    this.dist = dist.value || 25;
    this.minPrice = minPrice.value || 10;
    this.maxPrice = maxPrice.value || 100;
    return $http.get('http://localhost:8080/search/'+term+'/'+this.zip+'/'+this.dist+'/'+this.minPrice+'/'+this.maxPrice);
  }
  return {
    items: items
  }
}
