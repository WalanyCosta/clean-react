const { faker } = require('@faker-js/faker');
const helper = require('../page-object/form-helper');

const simulateValidSubmit = (sut, email = 'yonelma@gmail.com', password = 'yo#450') =>{
  sut.setInput('email', email);
  sut.setInput('password', password);
  sut.click('@submit');
};

describe('SurveyList', function () {
  beforeEach(()=>{
    helper.visit(browser, 'login');
    const page = browser.page.object();
    simulateValidSubmit(page);
  })

  it('should present correct UserName', async function (browser) {
   const page = browser.page.object();
    page.assert.urlContains('localhost:3000');
    helper.assertContainText(page, 'userEmail', 'yonelma@gmail.com');
  });

  it('should logout on logout link click', async function (browser) {
    const page = browser.page.object();
    page.click('@logout');
    page.assert.urlContains('localhost:3000/login');
  });

  it('should present survey items', async function (browser) {
    const page = browser.page.object();
    page.expect.elements('li:empty').count.to.equal(4);
    setTimeout(() => {
      page.expect.element('li:not(:empty)').to.be.present;
    });
  });
});
