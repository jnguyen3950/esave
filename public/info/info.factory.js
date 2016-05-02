var app = angular.module('esave');

app.factory('Info', info);

function info($http) {
  function currentItem(itemId) {
    this.itemId = itemId || 141971858834;
    return $http.get('http://localhost:8080/info/' + itemId);
  }
  return {
    currentItem: currentItem
  }
}
