var app = angular.module('esave');

app.factory('Info', info);

function info($http) {
  function currentItem(itemId) {
    currentURL = window.location.origin;
    this.itemId = itemId;
    return $http.get(currentURL + '/info/' + this.itemId);
  }

  function insertCategory(itemId, categoryId) {
    this.itemId = itemId;
    this.categoryId = categoryId;
    $http.post(currentURL + '/mongo/create/' + this.itemId + '/' + this.categoryId);
  }

  return {
    currentItem: currentItem,
    insertCategory: insertCategory
  }
}
