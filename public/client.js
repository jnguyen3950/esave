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
    var response = JSON.parse(xhr.responseText);
  });
}
