var app = angular.module('esave');

app.controller('infoController', info);

function info($http, Info) {
  var vm = this;
  currentRoute = window.location.hash;
  var itemId = currentRoute.substring(7, currentRoute.length);

  vm.detail = function() {
    var myItem = Info.currentItem(itemId);
    myItem.then(function(result) {
      vm.item = result.data;
      vm.choose(vm.item.Item.PrimaryCategoryID);
    });
  }

  vm.updatePicture = function(source) {
    vm.currentPicture = source;
  }

  vm.choose = function(categoryId) {
    this.categoryId = categoryId;
    Info.insertCategory(itemId, this.categoryId);
  }
}
