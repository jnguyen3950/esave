var app = angular.module('esave');

app.directive('list', list);

function list() {
  return {
    templateUrl: 'search/list.directive.html'
  }
}
