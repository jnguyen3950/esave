var app = angular.module('esave');

app.factory('Search', search);

function search($http) {
  function items(term) {
    return $http.post('http://localhost:1337/search/' + term);
  }

  return {
    items: items
  }
}
