const { faker } = require('@faker-js/faker');
const helper = require('../page-object/form-helper')

const simulateValidSubmit = (sut, email, password) =>{
  sut.setInput('email', email);
  sut.setInput('password', password);
  sut.setInput('passwordConfirmation', password);
  sut.click('@submit');
};

describe('SignUp', function () {
  beforeEach(()=>{
    helper.visit(browser, 'signup');
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

  it('should present valid state if form is invalid', function (browser) {
    const signup = browser.page.object();
    signup.setInput('email', faker.internet.email());
    helper.testInputStatus(signup, 'email');
    const password = faker.random.alphaNumeric(6); 
    signup.setInput('password', password);
    helper.testInputStatus(signup, 'password');
    signup.setInput('passwordConfirmation', password);
    helper.testInputStatus(signup, 'passwordConfirmation');
    signup.getTestById('submit').to.not.have.attribute('disabled');
  });

  it('should present error if email in used', function (browser) {
    const signup = browser.page.object();
    simulateValidSubmit(signup,"yonelma@gmail.com", "yo#450");
    helper.testMainError(signup, 'Já este existe Email');
    signup.assert.urlContains('localhost:3000/signup');
  });

  it('should go to Main page if email not in used', function (browser) {
    const signup = browser.page.object();
    simulateValidSubmit(signup, faker.internet.email(), faker.internet.password(8));
    helper.testMainError(signup);
    signup.assert.urlContains('localhost:3000');
  });
});