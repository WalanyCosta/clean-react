const helper = require('../page-object/form-helper')

describe('PrivateRoute', function () {

  it('should logout if survey-list has no token', function (browser) {
    helper.visit(browser);
    browser.assert.urlContains('localhost:3000/login');
  });
});