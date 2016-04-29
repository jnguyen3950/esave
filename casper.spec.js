casper.test.begin('eSave casper test suit', 2, function suite(test) {
  casper.start("http://localhost:" + 8080, function() {
    test.assertTitle("eSave", "eSave title is found.");
  })
  casper.waitForSelector('#searchResult', function() {
    casper.echo(this.page.content);
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
  casper.waitForSelector('#searchButton', function() {
    casper.echo(this.page.content);
    test.assertUrlMatch('http://localhost:' + 8080 + '/#/search', "eSave Url match.");
  });
  casper.then(function() {
    this.sendKeys('input#newTerm', 'Lego');
    this.clickLabel('Search', 'button');
  });
  casper.waitForSelector('form', function() {
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
