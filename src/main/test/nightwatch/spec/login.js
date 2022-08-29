const { faker } = require('@faker-js/faker');
const helper = require('../page-object/form-helper')

const simulateValidSubmit = (sut, email, password) =>{
  sut.setInput('email', email);
  sut.setInput('password', password);
  sut.click('@submit');
};

describe('Login', function () {
  beforeEach(()=>{
    helper.visit(browser, 'login');
  })

  it('should load with correct initial state', function (browser) {
    const login = browser.page.object();
    helper.testInputStatus(login, 'email', 'Campo obrigatório');
    helper.testInputStatus(login, 'password', 'Campo obrigatório');
    login.getTestById('submit').to.have.attribute('disabled');
  });

  it('should present error state if form is invalid', function (browser) {
    const login = browser.page.object();
    login.setInput('email', faker.random.word());
    helper.testInputStatus(login, 'email', 'valor inválido');
    login.setInput('password', faker.random.alphaNumeric(3));
    helper.testInputStatus(login, 'password', 'valor inválido');
    login.getTestById('submit').to.have.attribute('disabled');
  });

  it('should present valid state if form is invalid', function (browser) {
    const login = browser.page.object();
    login.setInput('email', faker.internet.email());
    helper.testInputStatus(login, 'email');
    login.setInput('password', faker.random.alphaNumeric(6));
    helper.testInputStatus(login, 'password');
    login.getTestById('submit').to.not.have.attribute('disabled');
  });

  it('should present error if invalid credentials are provided', function (browser) {
    const login = browser.page.object();
    simulateValidSubmit(login,faker.internet.email(), faker.random.alphaNumeric(6));
    helper.testMainError(login, 'credencias inválidas');
    login.assert.urlContains('localhost:3000/login');
  });

  it('should go to Main page if valid credentials are provided', function (browser) {
    const login = browser.page.object();
    simulateValidSubmit(login,'gildo@gmail.com', '123456');
    helper.testMainError(login);
    login.assert.urlContains('localhost:3000');
  });

  it('should not call submit if form is invalid', function (browser) {
    const login = browser.page.object();
    login.setInput('email', 'gildo@gmail.com').sendKeys('@email', ['nightwatch', browser.Keys.ENTER]);
    helper.testNoPresentSpinner(login);
  });
});
