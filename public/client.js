var button = document.getElementById('button');

button.addEventListener('click', function(event) {
  searchItem();
});

function searchItem() {
  var data = {itemName: 'Lego'};

  var xhr = new XMLHttpRequest;
  xhr.open('POST', '/search');
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.send(JSON.stringify(data));
  xhr.addEventListener('load', function() {
    var response = JSON.parse(xhr.response);
    console.log(response);
  });
}

window.navigator.geolocation.getCurrentPosition(function(pos){
  console.log(pos);
  $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+pos.coords.latitude+','+pos.coords.longitude+'&sensor=true').then(function(res){
    console.log(res.data);
  });
})
