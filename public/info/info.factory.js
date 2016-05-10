var app = angular.module('esave');

app.factory('Info', info);

function info($http) {
  var currentURL = window.location.origin;
  function currentItem(itemId) {
    this.itemId = itemId;
    return $http.get(currentURL + '/info/' + this.itemId);
  }

  function insertCategory(itemId, categoryId) {
    this.itemId = itemId;
    this.categoryId = categoryId;
    $http.post(currentURL + '/mongo/create/' + this.itemId + '/' + this.categoryId);
  }

  function submitEmail(userEmailText, sellerEmailText, sellerName, itemName, price, shipping, negotiatePrice) {
    $http.get(currentURL + '/email/'  + userEmailText + '/' + sellerEmailText + '/' + sellerName + '/' + itemName + '/' + price + '/' + shipping + '/' + negotiatePrice);
  }

  return {
    currentItem: currentItem,
    insertCategory: insertCategory,
    submitEmail: submitEmail
  }
}
