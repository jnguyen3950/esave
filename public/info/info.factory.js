var app = angular.module('esave');

app.factory('Info', info);

function info($http) {
  function currentItem(itemId) {
    this.itemId = itemId;
    return $http.get('http://localhost:8080/info/' + itemId);
  }

  function choose(itemId) {
    this.itemId = itemId;
    $http.post('http://localhost:8080/add/' + itemId);
  }

  return {
    currentItem: currentItem,
    choose: choose
  }
}
