var app = angular.module('esave', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/search', {
    templateUrl: 'search/show.directive.html',
    controller: 'searchController',
    controllerAs: 'search'
  });
}]);

app.controller('');
