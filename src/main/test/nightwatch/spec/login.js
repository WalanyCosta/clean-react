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
});
