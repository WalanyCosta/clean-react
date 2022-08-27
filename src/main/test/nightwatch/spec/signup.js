const { faker } = require('@faker-js/faker');
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

  it('should present error state if form is invalid', function (browser) {
    const signup = browser.page.object();
    signup.setInput('email', faker.random.word());
    helper.testInputStatus(signup, 'email', 'valor inválido');
    signup.setInput('password', faker.random.alphaNumeric(3));
    helper.testInputStatus(signup, 'password', 'valor inválido');
    signup.setInput('passwordConfirmation', faker.random.alphaNumeric(4));
    helper.testInputStatus(signup, 'passwordConfirmation', 'valor inválido');
    signup.getTestById('submit').to.have.attribute('disabled');
  });
});