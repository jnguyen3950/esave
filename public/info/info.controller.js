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
      if(vm.item.Item.ShippingCostSummary.ShippingType == "Calculated") {
        vm.shippingValue = "Varies by range.";
      }
      else {
        vm.shippingValue = '$ ' + vm.item.Item.ShippingCostSummary.ShippingServiceCost.Value;
      }
      vm.choose(vm.item.Item.PrimaryCategoryID);
      vm.updatePicture(vm.item.Item.PictureURL[0]);

      vm.userEmail = "userEmail@example.org";
      vm.sellerEmail = vm.item.Item.Seller.UserID + "@example.org";
    });
  }

  vm.updatePicture = function(source) {
    vm.currentPicture = source;
  }

  vm.choose = function(categoryId) {
    this.categoryId = categoryId;
    Info.insertCategory(itemId, this.categoryId);
  }

  vm.submitEmail = function(userEmailText, sellerEmailText, userPrice) {

    sellerName = vm.item.Item.Seller.UserID;
    itemName = vm.item.Item.Title;
    price = vm.item.Item.ConvertedCurrentPrice.Value;
    shipping = vm.shippingValue;
    negotiatePrice = userPrice || price;

    Info.submitEmail(userEmailText, sellerEmailText, sellerName, itemName, price, shipping, negotiatePrice);
  }
}
