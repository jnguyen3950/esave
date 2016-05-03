var app = angular.module('esave');

app.factory('Greeting', greeting);

function greeting($http) {
  function relatedItems(categoryId) {
    currentURL = window.location.origin;

    this.categoryId = categoryId;
    return $http.get(currentURL + "/greeting/" + categoryId);
  }
  return {
    relatedItems: relatedItems
  }
}
