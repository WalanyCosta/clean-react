const { faker } = require('@faker-js/faker');

describe('Login', function () {
  beforeEach(()=>{
    const login = browser.page.object();
    login.navigate()
  })

  it('should load with correct initial state', function (browser) {
    const login = browser.page.object();
    login.getTestById('email-wrap').to.have.attribute('data-status').which.contains('invalid');
    login.getTestById('email').to.have.attribute('title').which.contains('Campo obrigatório');
    login.getTestById('email-label').to.have.attribute('title').which.contains('Campo obrigatório');
    login.getTestById('password-wrap').to.have.attribute('data-status').which.contains('invalid');
    login.getTestById('password').to.have.attribute('title').which.contains('Campo obrigatório');
    login.getTestById('password-label').to.have.attribute('title').which.contains('Campo obrigatório');
    login.getTestById('submit').to.have.attribute('disabled');

    const result = login.hasDescendants('@errorWrap');
    console.log(`Exists element: ${result}`);
  });

  it('should present error state if form is invalid', function (browser) {
    const login = browser.page.object();
    login.setInput('email', faker.random.word());
    login.getTestById('email-wrap').to.have.attribute('data-status').which.contains('invalid');
    login.getTestById('email').to.have.attribute('title').which.contains('valor inválido');
    login.getTestById('email-label').to.have.attribute('title').which.contains('valor inválido');
    login.setInput('password', faker.random.alphaNumeric(3));
    login.getTestById('password-wrap').to.have.attribute('data-status').which.contains('invalid');
    login.getTestById('password').to.have.attribute('title').which.contains('valor inválido');
    login.getTestById('password-label').to.have.attribute('title').which.contains('valor inválido');
    login.getTestById('submit').to.have.attribute('disabled');
    
    const result = login.hasDescendants('@errorWrap');
    console.log(`Exists element: ${result}`);
  });

  it('should present valid state if form is invalid', function (browser) {
    const login = browser.page.object();
    login.setInput('email', faker.internet.email());
    login.getTestById('email-wrap').to.have.attribute('data-status').which.contains('valid');
    login.getTestById('email').to.not.have.attribute('title');
    login.getTestById('email-label').to.not.have.attribute('title');
    login.setInput('password', faker.random.alphaNumeric(6));
    login.getTestById('password-wrap').to.have.attribute('data-status').which.contains('valid');
    login.getTestById('password').to.not.have.attribute('title');
    login.getTestById('password-label').to.not.have.attribute('title');
    login.getTestById('submit').to.not.have.attribute('disabled');
  });

  it('should present error if invalid credentials are provided', function (browser) {
    const login = browser.page.object();
    login.setInput('email', faker.internet.email());
    login.setInput('password', faker.random.alphaNumeric(6));
    login.click('@submit');
    login.getTestById('spinner-status').to.be.present;
    login.getTestById('mainError').to.not.be.present;
    login.getTestById('spinner-status').to.not.be.present;
    login.getTestById('mainError').text.to.contain('credencias inválidas');
    login.assert.urlContains('localhost:3000/login');
  });

  it('should go to Main page if valid credentials are provided', function (browser) {
    const login = browser.page.object();
    login.setInput('email', 'gildo@gmail.com');
    login.setInput('password', '12345');
    login.click('@submit');
    login.getTestById('spinner-status').to.be.present;
    login.getTestById('mainError').to.not.be.present;
    login.getTestById('spinner-status').to.not.be.present;
    login.assert.urlContains('localhost:3000');
  });

  it('should not call submit if form is invalid', function (browser) {
    const login = browser.page.object();
    login.setInput('email', 'gildo@gmail.com').sendKeys('@email', ['nightwatch', browser.Keys.ENTER]);
    login.getTestById('mainError').to.not.be.present;
    login.getTestById('spinner-status').to.not.be.present;
  });
});
