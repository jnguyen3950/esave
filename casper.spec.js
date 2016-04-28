casper.test.begin('eSave casper test suit', 2, function suite(test) {
  casper.start("http://localhost:" + 8080, function() {
    test.assertTitle("eSave", "eSave title is found.");
  })
  casper.wait(200, function() {
    this.capture('Home-Page.png', {
      top: 0,
      left: 0,
      width: 400,
      height: 1000
    });
  })
  casper.thenEvaluate(function() {
    document.querySelector('#searchResult').click();
  });
  casper.wait(500, function() {
    test.assertUrlMatch('http://localhost:' + 8080 + '/#/search', "eSave Url match.");
  });
  casper.then(function() {
    this.sendKeys('input#newTerm', 'Lego');
    this.clickLabel('Search', 'button');
  });
  casper.wait(1000, function() {
    this.capture('Search-Page.png', {
      top: 0,
      left: 0,
      width: 400,
      height: 1000
    });
  });
  casper.run(function() {
    test.done();
  });
});
