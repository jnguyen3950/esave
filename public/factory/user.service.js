var app = angular.module('esave');

app.factory('userService', userService);

userService.$inject = ['$http'];

function userService($http) {
  function search() {
    return $http.post('http://localhost:1337/search');
  }

  function calculateDistance() {
    window.navigator.geolocation.getCurrentPosition(function(pos){
      console.log(pos);
      $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+pos.coords.latitude+','+pos.coords.longitude+'&sensor=true').then(function(res){
        console.log(res.data);
        return res.data;
      });
    })
  }

  return {
    search: search
  }
}
