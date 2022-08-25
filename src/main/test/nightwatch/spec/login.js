const { faker } = require('@faker-js/faker');

describe('Login', function () {
  beforeEach(()=>{
    const login = browser.page.object();
    login.navigate()
  })

  it('should load with correct initial state', function (browser) {
    const login = browser.page.object();
    login.getTestById('email-status').to.have.attribute('title').which.contains('Campo obrigatório')
    login.getTestById('email-status').text.to.contain('🔴');
    login.getTestById('password-status').to.have.attribute('title').which.contains('Campo obrigatório');
    login.getTestById('password-status').text.to.contain('🔴');
    login.getTestById('submit').to.have.attribute('disabled');
    
    const result = login.hasDescendants('@errorWrap');
    console.log(`Exists element: ${result}`);
  });

  it('should present error state if form is invalid', function (browser) {
    const login = browser.page.object();
    login.setInput('email', faker.random.word());
    login.getTestById('email-status').to.have.attribute('title').which.contains('value não valido')
    login.getTestById('email-status').text.to.contain('🔴');
    login.setInput('password', faker.random.alphaNumeric(3));
    login.getTestById('password-status').to.have.attribute('title').which.contains('value não valido');
    login.getTestById('password-status').text.to.contain('🔴');
    login.getTestById('submit').to.have.attribute('disabled');
    
    const result = login.hasDescendants('@errorWrap');
    console.log(`Exists element: ${result}`);
  });

  it('should present valid state if form is invalid', function (browser) {
    const login = browser.page.object();
    login.setInput('email', faker.internet.email());
    login.getTestById('email-status').to.have.attribute('title').which.contains('tudo certo')
    login.getTestById('email-status').text.to.contain('🟢');
    login.setInput('password', faker.random.alphaNumeric(6));
    login.getTestById('password-status').to.have.attribute('title').which.contains('tudo certo');
    login.getTestById('password-status').text.to.contain('🟢');
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
