var app = angular.module('esave', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/search/:categoryText', {
    templateUrl: 'search/search.view.html',
    controller: 'searchController',
    controllerAs: 'search'
  })
  .when('/info/:itemId', {
    templateUrl: 'info/info.view.html',
    controller: 'infoController',
    controllerAs: 'info'
  })
  .otherwise({
    templateUrl: 'greeting/greeting.view.html',
    controller: 'greetingController',
    controllerAs: 'greeting'
  })
}]);
