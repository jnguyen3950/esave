var app = angular.module('esave', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/search', {
    templateUrl: 'search/search.view.html',
    controller: 'searchController',
    controllerAs: 'search'
  })
  .otherwise({
    templateUrl: 'greeting/greeting.view.html',
    // controller: 'greetingController',
    // controllerAs: 'greeting'
  })
}]);
