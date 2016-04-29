var app = angular.module('esave');

app.controller('infoController', info);

function info($http, Info) {
  var vm = this;

  vm.detail = function() {
    var myItem = Info.currentItem(141971858834);
    myItem.then(function(result) {
      console.log(result);
    });
  }
}
