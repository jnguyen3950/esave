var app = angular.module('esave');

app.factory('Greeting', greeting);

function greeting($http) {
  function relatedItems(categoryId) {
    this.categoryId = categoryId;
    return $http.get("http://localhost:8080/greeting/" + categoryId);
  }
  return {
    relatedItems: relatedItems
  }
}
