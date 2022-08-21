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
});
