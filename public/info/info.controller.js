var app = angular.module('esave');

app.controller('infoController', info);

function info($http, Info) {
  var vm = this;

  vm.detail = function() {
    currentRoute = window.location.hash;
    var itemId = currentRoute.substring(7, currentRoute.length);
    var myItem = Info.currentItem(itemId);
    myItem.then(function(result) {
      vm.item = result.data;
      console.log(vm.item);
      console.log(vm.item.Item.PictureURL[0]);
    });
  }

  vm.updatePicture = function(source) {
    vm.currentPicture = source;
  }
}
