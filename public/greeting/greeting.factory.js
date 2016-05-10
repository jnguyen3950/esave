var app = angular.module('esave');

app.factory('Greeting', greeting);

function greeting($http) {
  var currentURL = window.location.origin;
  function relatedItems(categoryId) {
    this.categoryId = categoryId;
    return $http.get(currentURL + "/greeting/" + categoryId);
  }
  return {
    relatedItems: relatedItems
  }
}
