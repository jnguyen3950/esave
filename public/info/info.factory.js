var app = angular.module('esave');

app.factory('Info', info);

function info($http) {
  function currentItem(itemId) {
    this.itemId = itemId;
    return $http.get('http://localhost:8080/info/' + this.itemId);
  }

  function insertCategory(itemId, categoryId) {
    this.itemId = itemId;
    this.categoryId = categoryId;
    $http.post('http://localhost:8080/add/' + this.itemId + '/' + this.categoryId);
  }

  return {
    currentItem: currentItem,
    insertCategory: insertCategory
  }
}
