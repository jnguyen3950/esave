var app = angular.module('esave');

app.factory('Search', search);

function search($http) {
  function items(term) {
    return $http.get('http://localhost:8080/search/' + term);
  }

  return {
    items: items
  }
}
