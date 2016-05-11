var app = angular.module('esave');

app.factory('Greeting', greeting);

function greeting($http) {
  var currentURL = window.location.origin;
  function relatedItems(categoryId, page) {
    return $http.get(currentURL + "/greeting/" + categoryId + "/" + page);
  }
  return {
    relatedItems: relatedItems
  }
}
