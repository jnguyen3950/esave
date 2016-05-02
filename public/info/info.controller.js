var app = angular.module('esave');

app.controller('infoController', info);

function info($http, Info) {
  var vm = this;

  vm.detail = function() {
    currentRoute = window.location.hash;
    var itemId = currentRoute.substring(7, currentRoute.length);
    var myItem = Info.currentItem(itemId);
    Info.choose(itemId);
    myItem.then(function(result) {
      vm.item = result.data;
      console.log(vm.item);
    });
  }

  vm.updatePicture = function(source) {
    vm.currentPicture = source;
  }

  vm.choose = function(itemID) {

  }
}
