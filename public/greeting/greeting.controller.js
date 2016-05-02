var app = angular.module('esave');

app.controller('greetingController', greeting);

function greeting($http, Greeting) {
  var vm = this;

  var xhr = new XMLHttpRequest;
  xhr.open('GET', '/mongo/read');
  xhr.send();
  xhr.addEventListener('load', function() {
    var response = JSON.parse(xhr.responseText);

    for (var i = response.length - 1; i >= 0 ; i--) {
      var promise = Greeting.relatedItems(response[i].categoryId);
      promise.then(function(result) {
        vm.bigList = result.data.findItemsByCategoryResponse[0].searchResult[0].item;
        console.log(vm.bigList);
      });
    }
  });
}
