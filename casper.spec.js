casper.test.begin('eSave casper test suit', function suite(test) {
  casper.start("http://localhost:" + 8080, function() {
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
  casper.run(function() {
    test.done();
  })
});
