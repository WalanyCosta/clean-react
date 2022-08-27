const helper = require('../page-object/form-helper')

describe('Login', function () {
  beforeEach(()=>{
    browser.url('http://localhost:3000/signup')
  })

  it('should load with correct initial state', function (browser) {
    const signup = browser.page.object();
    helper.testInputStatus(signup, 'email', 'Campo obrigatório');
    helper.testInputStatus(signup, 'password', 'Campo obrigatório');
    helper.testInputStatus(signup, 'password', 'Campo obrigatório');
    signup.getTestById('submit').to.have.attribute('disabled');
  });
});