casper.test.begin('eSave casper test suit', 2, function suite(test) {
  casper.start("http://localhost:" + 8080 + "/#", function() {
    test.assertTitle("eSave", "eSave title is found.");
    this.click('#searchResult');
  })
  casper.wait(200, function() {
    test.assertUrlMatch('http://localhost:' + 8080 + '/#/search', "eSave Url match.");
  });
  casper.then(function() {
    this.sendKeys('input#newTerm', 'Lego');
    this.click('#searchButton');
  });
  casper.wait(1000, function() {
    this.capture('esaveSearch.png', {
      top: 0,
      left: 0,
      width: 500,
      height: 1000
    });
  });
  casper.run(function() {
    test.done();
  });
});
